import os
import csv
import json
from pprint import PrettyPrinter

pp = PrettyPrinter(indent=2, sort_dicts=False)

in_filename = './dd-average/monthly_dd_ids.csv'
out_filename = './dd-average/monthly_dd_json.csv'

with open(in_filename, 'r') as in_file:
    reader = csv.DictReader(in_file)

    data = [r for r in reader]

months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
result = []

for row in data:
    row_dict = {}
    row_dict.update({'id': row['id'], 'city': row['City'], 'lat': row['lat'], 'lon': row['lon'], 'zip': row['zip']})
    
    cooling = {}
    heating = {}

    for k, v in row.items():
        if ('cdd' in k):
            cooling[k.split(' ')[1].lower()] = v
        elif ('hdd' in k):
            heating[k.split(' ')[1].lower()] = v

    row_dict['cooling'] = json.dumps(cooling)
    row_dict['heating'] = json.dumps(heating)

    result.append(row_dict)

out_keys = result[0].keys()

with open(out_filename, 'w', newline='') as out_file:
    writer = csv.DictWriter(out_file, out_keys)
    writer.writeheader()
    writer.writerows(result)
pp.pprint(data[:2])
pp.pprint(result[:2])