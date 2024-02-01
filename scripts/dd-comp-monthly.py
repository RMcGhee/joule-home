import os
import csv
import sqlalchemy as sa
from uszipcode import SearchEngine, SimpleZipcode
from pprint import PrettyPrinter

pp = PrettyPrinter(indent=2)
search = SearchEngine()

months = {
    'Jan': 31, 'Feb': 28, 'Mar': 31, 'Apr': 30, 'May': 31, 'Jun': 30,
    'Jul': 31, 'Aug': 31, 'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31
    }

def get_dd_data(result: dict, filename: str, dd_type: str) -> dict:
    with open(filename, 'r') as in_file:
        month, year = filename.split('/')[-1].split('.txt')[0].split(' ')
        
        raw = in_file.readlines()[14:]

        for line in raw:
            # first 20 chars: ' ST city may have spaces'
            # 0         1       2           3
            # StateAb.  City.   CallSign    dd_month_or_week .......
            st_city, data = line[:20].split(' '), [x for x in line[20:].split(' ') if x != '']

            state, city = st_city[1], ' '.join([x for x in st_city[2:] if x != ''])
            dd = data[1]
            
            if (f'{city}, {state}' not in result):
                result[f'{city}, {state}'] = {}
            city_data = dd_data[f'{city}, {state}']
            city_data[f'{dd_type} {month} {year}'] = int(dd)
    return result

def get_dd_averages(result: dict) -> dict:
    for city, data in result.items():
        for month in months.keys():
            cdd_mon_av = round(sum([v for k, v in data.items() if f'cdd {month}' in k]) / 3)
            hdd_mon_av = round(sum([v for k, v in data.items() if f'hdd {month}' in k]) / 3)
            data[f'cdd {month}'] = cdd_mon_av
            data[f'hdd {month}'] = hdd_mon_av
    return result

def fix_map_names(result: dict) -> dict:
    fix_list = [
        ('BETTLES FIELD, AK', 'BETTLES, AK'), ('DELTA JUNCTION, AK', 'BIG DELTA, AK'),
        ('COPPER CENTER, AK', 'GULKANA, AK'), ('MC GRATH, AK', 'MCGRATH, AK'),
        ('SAINT PAUL ISLAND, AK', 'ST PAUL ISLAND, AK'), ('MOUNT SHASTA, CA', 'MT SHASTA, CA'),
        ('FORT LAUDERDALE, FL', 'FT LAUDERDALE, FL'), ('HILO, HI', 'HILO-HAWAII, HI'),
        ('HONOLULU, HI', 'HONOLULU-OAHU, HI'), ('KAHULUI, HI', 'KAHULUI-MAUI, HI'),
        ('LIHUE, HI', 'LIHUE-KAUAI, HI'), ('SAULT SAINTE MARIE, MI', 'SAULT ST MARIE, MI'),
        ('INTERNATIONAL FALLS, MN', "INT'L FALLS, MN"), ('MOUNT WASHINGTON, NH', 'MT WASHINGTON, NH'),
        ('HATTERAS, NC', 'CAPE HATTERAS, NC'), ('RALEIGH, NC', 'RALEIGH DURHAM, NC'),
        ("DEVILS LAKE, ND", "DEVIL'S LAKE, ND"), ('AKRON, OH', 'AKRON CANTON, OH'),
        ('BAKER CITY, OR', 'BAKER, OR'), ('DALLAS, TX', 'DALLAS FT WORTH, TX'),
        ('MIDLAND, TX', 'MIDLAND ODESSA, TX'), ('FORKS, WA', 'QUILLAYUTE, WA'),
        ('RENTON, WA', 'SEATTLE TACOMA, WA'), ('LA CROSSE, WI', 'LACROSSE, WI'),
        ]

    for fix_city, bad_city in fix_list:
        result[fix_city] = result.pop(bad_city)

    return result

def get_map_info(result: dict) -> dict:
    for city_state, data in result.items():
        city, state = city_state.split(', ')
        sql = f'SELECT * FROM simple_zipcode WHERE major_city LIKE "%{city}%" AND state = "{state}" ORDER BY population_density DESC'
        city_info = search.ses.execute(sql).first()
        data['zip'] = city_info.zipcode
        data['lat'] = city_info.lat
        data['lon'] = city_info.lng
    
    return result

def get_json_out_data(result: dict) -> dict:
    for key, value in result.items():
        value['cooling'] = {month.lower(): value[f'cdd {month}'] for month in months.keys()}
        value['heating'] = {month.lower(): value[f'hdd {month}'] for month in months.keys()}
        for year in ['2021', '2022', '2023']:
            value[year] = {
                'cooling': {month.lower(): value[f'cdd {month} {year}'] for month in months.keys()},
                'heating': {month.lower(): value[f'hdd {month} {year}'] for month in months.keys()},
            }
    return result

cdd_monthly_files = [x for x in os.listdir('./scripts/cdd-data/monthly/2021') if 'DS_Store' not in x]
hdd_monthly_files = [x for x in os.listdir('./scripts/hdd-data/monthly/2021') if 'DS_Store' not in x]

test_filename = './scripts/cdd-data/monthly/2021/Apr 2021.txt'
cdd_monthly_folder = './scripts/cdd-data/monthly/'
hdd_monthly_folder = './scripts/hdd-data/monthly/'

cdd_filenames = [f'{cdd_monthly_folder}{y}/{m} {y}.txt' for y in [2021, 2022, 2023] for m in months.keys()]
hdd_filenames = [f'{hdd_monthly_folder}{y}/{m} {y}.txt' for y in [2021, 2022, 2023] for m in months.keys()]

dd_data = {}

for filename in cdd_filenames:
    dd_data = get_dd_data(dd_data, filename, 'cdd')

for filename in hdd_filenames:
    dd_data = get_dd_data(dd_data, filename, 'hdd')

dd_data = get_dd_averages(dd_data)

dd_data = fix_map_names(dd_data)

dd_data = get_map_info(dd_data)

dd_data = get_json_out_data(dd_data)

csv_headers = {}
for city_data in dd_data.values():
    csv_headers.update(city_data.items())

csv_headers = ['City', 'id', 'zip', 'lat', 'lon', 'heating', 'cooling', '2021', '2022', '2023']

out_data = {}
out_keys: list = list(dd_data.keys())
out_keys.sort(key=lambda x: (x.split(', ')[1], x.split(', ')[0]))

with open('./scripts/dd-average/year_monthly_dd.csv', 'w', newline='') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=csv_headers)

    writer.writeheader()
    for id, key in enumerate(out_keys):
        dd_data[key]['City'] = key
        dd_data[key]['id'] = id
        writer.writerow(dd_data[key])

search.close()
