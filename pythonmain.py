import pandas as pd
from openpyxl import load_workbook
import sys
import os
import time

df = pd.read_excel('', engine='openpyxl',
                   dtype={'CTN': 'str'})
pd.set_option('display.max_rows', 100000)


now = time.strftime('%Y_%m_%d', time.localtime(time.time()))
path = f'./201230_{now}'

os.mkdir(path)


n = 1000
i = 0


for i in range(0, len(ctn), n):
    df['CTN'][i:i+n].to_csv(f'{path}/output{i+1000}.txt',
                            mode='w', index=False, header=False)
#     print(df['CTN'][i:i+n])
    i += 1000
