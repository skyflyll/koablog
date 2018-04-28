const sha1 = require('sha1');
const ModelUser = require('../models/users');
module.exports = {
    // 注册
    get: async (ctx, next) => {
        await ctx.render('login')
    },
    // 登录
    post: async (ctx, next) => {
        const user = ctx.request.body.user;
        const pass =ctx.request.body.pass;
        await ModelUser.getUserByName(user)
            .then((res) => {
                if(!res){
                    console.log('用户不存在')
                    return ctx.redirect('back');
                }
                if(sha1(pass)!==res.pass){
                    console.log('用户密码不匹配')
                    return ctx.redirect('back');
                }
                delete res.pass;
                ctx.session.user = res;
                console.log("登录成功")
                ctx.redirect('/')
            }).catch(next)
    }
}