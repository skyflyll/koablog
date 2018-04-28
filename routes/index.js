const router = require('koa-router')()
const fs = require('fs');
const moment = require('moment');
const sha1 = require('sha1');
const ModelUser = require('../models/users');
const checkLogin = require('../middlewares/check').checkLogin;

//首页
router.get('/',checkLogin, async (ctx, next) => {
  await ctx.render('index')
});

// 登录
router.get('/login',require('./login').get)

// 登录 post
router.post('/login',require('./login').post)

//注册页 get
router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})

//这册页 post
router.post('/register', async (ctx, next) => {
  const file = ctx.request.body.files.file;    // 获取上传文件
  const reader = fs.createReadStream(file.path);  // 创建可读流
  const ext = file.name.split('.').pop();   // 获取上传文件扩展名
  const time = moment().format('YYYYMMDDhhmmss') //时间戳
  const img_url = 'koa_blog' + time + parseInt(Math.random() * 10000) + '.' + ext //上传文件的路径
  const upStream = fs.createWriteStream(`public/uploads/img/` + img_url); // 创建可写流
  reader.pipe(upStream);  // 可读流通过管道写入可写流

  const user = {
    user: ctx.request.body.fields.user,
    pass: sha1(ctx.request.body.fields.pass),
    sex: ctx.request.body.fields.sex,
    describe: ctx.request.body.fields.describe,
    avatar: img_url
  }

  await ModelUser.create(user)
    .then((res) => {
      //存储删除密码的session
      const session_user = res;
      session_user.pass=null;
      delete session_user.pass;
      ctx.session.user = session_user;

      console.log("register-----------",ctx.session.user)
      ctx.render('index',{user:session_user})
    })

})

router.get('/logout',async (ctx,next)=>{
  ctx.session.user = '';
  await ctx.redirect('/login')
})

router.get('/post', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
