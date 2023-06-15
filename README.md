# query-encrypto 路由路径参数加密与解析

## 本地安装

#### 1、npm install @yc/query-encrypto --save

#### 2、在 main.js 中:

```js
import { stringifyQuery, parseQuery } from '@yc/query-encrypto';
```

#### 3、接下来你就可以在 vue-router 中覆盖默认方法了

## 使用方法

```js
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  stringifyQuery: stringifyQuery,
  parseQuery: parseQuery,
  routes,
});
```
