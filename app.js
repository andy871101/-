const express = require('express');

// // 创建 Express 应用程序
// const app = express();

// 定义路由
// app.get('/', (req, res) => {
// res.send('Hello, World!');
// });

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());