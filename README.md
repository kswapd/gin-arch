# Gin demo project
## 1. Description
This is a project to demostrate how to integrate html static file and golang source code to one exucutable file.

## 2. Installation
 ### 1. Setup `go-bindata` which can convert static files to go source file.
 ```bash
 go get -u github.com/jteeuwen/go-bindata/...
 ```

 ### 2. Run go-bindata command to get golang source file.
 ```bash
 go-bindata ./html/...
 ```
**Note:** Don't forget elipsis postfix to include all sub-directories recursively.

### 3. Move bindata.go to mydata, and package name is needed to changed to mydata
```bash
mv bindata.go mydata/
sed -i 's/package main/package mydata/g' mydata/bindata.go
```

### 4. Run service

```
go run gin-hi.go 
#or
go build && ./gin-test
```