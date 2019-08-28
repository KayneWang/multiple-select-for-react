# multiple-select-for-react

基于 antd select 实现的复杂类型选择器

<img src="./image/select.png" width="500" />

## 介绍

满足业务需求的简单实现，<b>欢迎大家共同完善、交流</b>

## 使用简单

1、选择搜索类型

2、使用回车键回调当前搜索内容

## API

| name | desc | type | eg |
| --- | --- | --- | --- |
| value | 选中的值 | Object | {name: 'testname'} |
| handleSearch | 回调函数 | func | 必填选项 |
| items | 搜索类型 | Object | {name: '姓名'} |
| style | 搜索框样式 | Object | {width: '100%'} |
| placeholder | 搜索框默认文字 | String | '请选择类型' |

## 使用方法

```shell
$ yarn install
```

```shell
$ yarn start
```
