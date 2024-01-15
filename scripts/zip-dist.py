import csv
import time
from uszipcode import SearchEngine, SimpleZipcode
from pprint import PrettyPrinter
from geopy import distance

pp = PrettyPrinter(indent=2)
search = SearchEngine()


# Round to the nearest 1/base
def round_nearest(to_round: float, base: int) -> float:
    return round(to_round * base) / base

def get_zip_info() -> list:
    sql = 'SELECT zipcode, lat, lng, major_city, state FROM simple_zipcode ORDER BY zipcode'
    zip_list = search.ses.execute(sql).all()
    result = [{'zip': x.zipcode, 'lat': x.lat, 'lon': x.lng, 'city': f'{x.major_city}, {x.state}'} for x in zip_list]
    return result

def get_top_five(dd_list: list, zip_list: list) -> list:
    print(f'Total in zip list: {len(zip_list)}')
    limit_max = 1000
    start_time = time.time_ns()

    # memoize results of top five for lat/long within 1/20 of a degree (3.45 miles)
    memo_lat_long = {}
    batch_size = 40

    for i, row in enumerate(zip_list[:limit_max], start=1):
        dist_dict = {}
        row_coord = (round_nearest(row['lat'], 20), round_nearest(row['lon'], 20))
        coord_key = f'{row_coord[0]:.2f}, {row_coord[1]:.2f}'
        if (coord_key in memo_lat_long):
            top_five = memo_lat_long[coord_key]
        else:
            for dest in dd_list:
                dest_coord: tuple = (dest['lat'], dest['lon'])
                dist_dict[dest['City']] = (dest['id'], distance.distance(row_coord, dest_coord).km, *dest_coord)
        
            top_five = sorted(dist_dict.items(), key=lambda x: x[1][1])[:5]
            memo_lat_long[coord_key] = top_five
        row['top_five'] = [(x[0], x[1][0]) for x in top_five]

        if (i % 40 == 0):
            time_diff = time.time_ns() - start_time
            elapsed = time_diff / 1000000000
            elapsed_f = elapsed if elapsed < 60 else elapsed / 60
            av_time = time_diff // i
            av_per_batch = (av_time * batch_size) / 1000000000
            time_left = ((elapsed / i) * (limit_max - i)) / 60
            e_string = f'Elapsed: {elapsed_f:.1f}{"s" if elapsed < 60 else "m"} | Left: {time_left:.1f}m'
            print(f'{e_string:<30} {i:>8}/{limit_max}\t Av/{batch_size}: {av_per_batch:.1f}s')
    
    return zip_list

zip_list = get_zip_info()

with open('./scripts/dd-average/monthly_dd.csv', 'r') as dd_file:
    reader = csv.DictReader(dd_file)
    dd_list = [row for row in reader]

for i, row in enumerate(dd_list):
    row['lat'] = float(row['lat'])
    row['lon'] = float(row['lon'])

zip_list = get_top_five(dd_list, zip_list)
search.close()
