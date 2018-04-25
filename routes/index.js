const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/register', async (ctx,next)=>{
  await ctx.render('register')
})
router.post('/register', async (ctx,next)=>{
  // console.log(ctx.response);
  ctx.body='正在注册'
  console.log('body:',JSON.stringify(ctx.request.body))
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
