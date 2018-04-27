const sha1 = require('sha1');
const ModelUser = require('../models/users');
module.exports = {
    get: async (ctx, next) => {
        await ctx.render('login')
    },
    post: async (ctx, next) => {
        // await ctx.render('login')
        console.log('post',ctx.request.body.fields)
        // const user = ctx.request.body.fields.user;
        // const pass = ctx.request.body.fields.pass;
        // await ModelUser.getUserByName(user)
        //     .then((res) => {
        //         console.log("登录返回信息",res)
        //     })
    }
}