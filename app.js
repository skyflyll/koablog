import { stat } from 'fs';
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const logger = require('koa-logger');


app.use(bodyparser({
    enableTypes:['json','from','text']
}))

app.use(json());
app.use(logger());

//设置静态路由
app.use(require(require('koa-static')(__dirname+'/public')));

//使用ejs模板
app.use(views(__dirname+'/views',{
    extension:'ejs'
}))

//logger
app.use(async (ctx,next)=>{
    const start = new Date()
    await next();
    const ms = new Date()-start;
    console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
})
