# -*- coding: utf-8 -*-
import pandas as pd
from openpyxl import load_workbook
import sys
import os
import time
import cmath


def main(argv):
    inputPath = argv[1]
    rowName = argv[2]
    outPath = argv[3]

    df = pd.read_excel(inputPath, engine='openpyxl',
                       dtype={rowName: 'str'})
    rowArray = df[:]
    pd.set_option('display.max_rows', 100000)
    now = time.strftime('%Y_%m_%d', time.localtime(time.time()))
    path = "{}/exceloutput_{}".format(outPath, now)
    if not os.path.exists(path):
        os.mkdir(path)
    n = 1000
    i = 0
    for i in range(0, len(rowArray), n):
        df['CTN'][i:i+n].to_csv("{}/{}.txt".format(path, i),
                                mode='w', index=False, header=False)
        i += 1000


if __name__ == '__main__':
    main(sys.argv)
