# hctf_frontend

[![Build Status](https://travis-ci.com/Last-Order/hctf_frontend.svg?token=uBw9xobwdoesz9s114pS&branch=master)](https://travis-ci.com/Last-Order/hctf_frontend)

> HCTF Frontend

## 构建说明

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 多语言

平台前台内置中英两种语言，如需扩展请查看`src/i18n`文件夹并按格式新建语言文件。

此外，还需要在`src/App.vue`内添加切换到新语言的按钮。

## 其他

网站根目录为`./dist`文件夹，另默认后台路径为`/API`。
