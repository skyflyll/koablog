module.exports = {
    //检查是否登录
    checkLogin: async (ctx,next)=>{
        if(!ctx.session.user){
            return ctx.redirect('/register')
        }
        await next()
    },
    checkNotLogin:async (ctx,next)=>{
        if(ctx.session.user){
            return ctx.redirect('back')
        }
    }
}