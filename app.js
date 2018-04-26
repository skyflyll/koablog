const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody =require('koa-body');
const logger = require('koa-logger')
const fs = require('fs');

//链接mongodb数据库
// const mongo = require('./mongodb/mongo')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }))

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024,
    },
}));

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    const logger =`${ctx.method} ${ctx.url} - ${ms}ms`
    // console.log(logger,ctx.request.headers)
    //写入日志信息
    fs.appendFileSync('./logger/logger.txt', start.toUTCString()+logger+'写入日志\n', function (err) {
        if (err) console.error(err);
    });
})


//设置路由
const index = require('./routes/index')
const users = require('./routes/users')

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
