import pandas as pd
from openpyxl import load_workbook
import sys
import os
import time


inputPath = sys.argv[0]
rowName = sys.argv[1]
df = pd.read_excel(inputPath, engine='openpyxl',
                   dtype={rowName: 'str'})
rowArray = df[:]
pd.set_option('display.max_rows', 100000)
now = time.strftime('%Y_%m_%d', time.localtime(time.time()))
path = f'./exceloutput_{now}'
if not os.path.exists(path):
    os.mkdir(path)
n = 1000
i = 0
for i in range(0, len(rowArray), n):
    df['CTN'][i:i+n].to_csv(f'{path}/output{i}.txt',
                            mode='w', index=False, header=False)
    i += 1000
