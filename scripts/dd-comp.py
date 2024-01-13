import os
import csv
from pprint import PrettyPrinter

pp = PrettyPrinter(indent=2)

cdd_monthly_files = [x for x in os.listdir('./scripts/cdd-data/monthly/2021') if 'DS_Store' not in x]
hdd_monthly_files = [x for x in os.listdir('./scripts/hdd-data/monthly/2021') if 'DS_Store' not in x]

months = {
    'Jan': 31, 'Feb': 28, 'Mar': 31, 'Apr': 30, 'May': 31, 'Jun': 30,
    'Jul': 31, 'Aug': 31, 'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31
    }

test_filename = './scripts/cdd-data/monthly/2021/Apr 2021.txt'
cdd_monthly_folder = './scripts/cdd-data/monthly/'
hdd_monthly_folder = './scripts/hdd-data/monthly/'

cdd_filenames = [f'{cdd_monthly_folder}{y}/{m} {y}.txt' for y in [2021, 2022, 2023] for m in months.keys()]
hdd_filenames = [f'{hdd_monthly_folder}{y}/{m} {y}.txt' for y in [2021, 2022, 2023] for m in months.keys()]

cdd_data = {}

for filename in cdd_filenames:
    with open(filename, 'r') as in_file:
        month, year = filename.split('/')[-1].split('.txt')[0].split(' ')
        cdd_data[year] = {month: {}}
        
        raw = in_file.readlines()[14:]

        for line in raw:
            # first 20 chars: ' ST city may have spaces'
            # 0         1       2           3
            # StateAb.  City.   CallSign    dd_month_or_week .......
            st_city, data = line[:20].split(' '), [x for x in line[20:].split(' ') if x != '']

            state, city = st_city[1], ' '.join([x for x in st_city[2:] if x != ''])
            dd = data[1]
            
            this_month_dict = cdd_data[year][month]
            if (state not in this_month_dict):
                this_month_dict[state] = {}
            this_month_dict[state][city] = int(dd)

    pp.pprint(cdd_data)
