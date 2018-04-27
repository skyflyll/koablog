const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body');
const logger = require('koa-logger')
const fs = require('fs');
const session = require('koa-session');

//链接mongodb数据库
// const mongo = require('./mongodb/mongo')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }))

//koa-session设置会话
app.keys = ['some secret hurr'];

const store ={
    get(key){
        const sessionDir = path.resolve(__dirname,'./public/session');
        const files = fs.readdirSync(sessionDir);
        console.log("数据表的长度：",files.length)
        for(let i=0; i<files.length; i++){
            if(files[i].startsWith(key)){
                const filePath = path.resolve(sessionDir,files[i])
                delete require.cache[require.resolve(filePath)]
                const result = require(filePath)
                return result
            }
        }
    },

    set(key,session){
        const filePath = path.resolve(__dirname,'./public/session',`${key}.js`);
        const content = `module.exports = ${JSON.stringify(session)};`;
        fs.writeFileSync(filePath,content)
    },

    destroy(key){
        const filePath = path.resolve(__dirname,'./public/session',`${key}.js`)
        fs.unlinkSync(filePath);
    }
}

const CONFIG = {
    key: 'llblog',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    store,
    // encode: json => JSON.stringify(json),
    // decode: str => JSON.parse(str),
};

app.use(session(CONFIG, app))

//koa-body间隙传输数据类型格式
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024,
    },
}));

app.use(json())
app.use(logger())

//静态资源库
app.use(require('koa-static')(__dirname + '/public'))
//设置模板引擎
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    const logger = `${ctx.method} ${ctx.url} - ${ms}ms`
    //写入日志信息
    fs.appendFileSync('./logger/logger.txt', start.toUTCString() + logger + '写入日志\n', function (err) {
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
