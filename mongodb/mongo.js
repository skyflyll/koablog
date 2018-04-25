const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/koablog',(err,db)=>{
    console.log('数据库连接成功')
});

//定义Schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//定义数据类型
const user = new Schema({
    name:{type:String,default:'langge'},
    age:{type:Number,min:18,index:true,default:24},
    date:{type:Date,default:Date.now}
})
exports.Users = mongoose.model("users",user);


// const modeluser = new Users();


//增
// modeluser.save(function(){
//     console.log('kkkkkkkkkkkkkk')
// })

// Users.create(user,function(){
//     console.log('kkkkkkkkkkkkkk')
// })

//删
// Users.remove({age:24},function(){
//     console.log('remove success')
// })

//改
// Users.update({_id:'5ae02bf24959526e9adc752c'},{name:"linlang hhhhh"},function(){
//     console.log('update success')
// })

//查
// Users.find({},null,{limit:1},function (err, docs) {
//     // docs.forEach
//     console.log(docs)
// });




