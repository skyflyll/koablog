const router = require('koa-router')();
const UserModel = require('../models/users')
router.prefix('/users');

router.get('/',function(ctx,next){
    ctx.body= 'this is a users response';
    const user ={
        name:'linlang',
        age:'100',
        date:new Date()
    };
    UserModel.create(user).then(function(){
        console.log('lllllllllllllllll')
    });
})

router.get('/bar',function(ctx,next){
    ctx.body= 'this is a users/bar'
})

module.exports = router;