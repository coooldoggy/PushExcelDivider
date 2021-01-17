# PushExcelDivider

## Pyinstaller로 Python 실행파일 만들기

### Mac

--onefile : file 한개만 만들기
--distpath: file 생성 위치

```
pyinstaller --onefile ExcelProcesser.py
pyinstaller ExcelProcesser.py --distpath pydist

rm -rf build/
rm -rf ExcelProcesser.spec
```

### Window

exe file은 wine을 통해 생성 

#### wine 설치

```
brew install xquartz --cask
brew install wine-stable --cask
```

#### wine에 python 설치 

```
wget https://www.python.org/ftp/python/2.7.9/python-2.7.9.amd64.msi

wine64 msiexec /i python-2.7.9.amd64.msi /qb
```

#### wine 에 pyinstaller 설치 

```
cd ~/.wine/drive_c/Python27

wine64 python.exe Scripts/pip2.7.exe install pyinstaller==3.5
```

#### pyinstaller로 exe 만들기 

```
wine64 ~/.wine/drive_c/Python27/Scripts/pyinstaller.exe --onefile Pythonfile.py
```

#### Window Exe File Error 해결

##### ModuleNotFoundError: No module named 'pandas'

1. Exe File 생성
```
pyinstaller -F PythonFile.py
```

2. .spec file  수정 : 아래 코드 추가 
```
def get_pandas_path():
    import pandas
    pandas_path = pandas.__path__[0]
    return pandas_path

dict_tree = Tree(get_pandas_path(), prefix='pandas', excludes=["*.pyc"])
a.datas += dict_tree
a.binaries = filter(lambda x: 'pandas' not in x[0], a.binaries)
```

3. spec file로 재빌드 
```
pyinstaller -F PythonFile.spec
```

##### ModuleNotFoundError: No module named 'openpyxl' 

1. Exe File 생성
```
pyinstaller -F PythonFile.py
```

2. .spec file  수정 : 아래 코드 추가 
```
a = Analysis([
             hiddenimports=['openpxl'],
         )
```
3. spec file로 재빌드 
```
pyinstaller -F PythonFile.spec
```
