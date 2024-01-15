import os
import csv
import sqlalchemy as sa
from uszipcode import SearchEngine, SimpleZipcode
from pprint import PrettyPrinter
from geopy import distance

pp = PrettyPrinter(indent=2)
search = SearchEngine()

def get_zip_info() -> list:
    sql = 'SELECT zipcode, lat, lng, major_city, state FROM simple_zipcode ORDER BY zipcode'
    zip_list = search.ses.execute(sql).all()
    result = [{'zip': x.zipcode, 'lat': x.lat, 'lon': x.lng, 'city': f'{x.major_city}, {x.state}'} for x in zip_list]
    return result

def get_top_five(dd_list: list, zip_list: list) -> list:
    limit_max = 20

    for row in zip_list[:limit_max]:
        dist_dict = {}
        row_coord = (row['lat'], row['lon'])
        for dest in dd_list:
            dest_coord: tuple = (dest['lat'], dest['lon'])
            dist_dict[dest['City']] = (dest['id'], distance.distance(row_coord, dest_coord).km, *dest_coord)
        
        top_five = sorted(dist_dict.items(), key=lambda x: x[1])[:5]
        row['top_five'] = [(x[0], x[1][0]) for x in top_five]
    
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
