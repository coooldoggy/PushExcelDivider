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

wine64 python.exe Scripts/pip.exe install pyinstaller
```

#### pyinstaller로 exe 만들기 

```
wine64 ~/.wine/drive_c/Python27/Scripts/pyinstaller.exe --onefile Pythonfile.py
```