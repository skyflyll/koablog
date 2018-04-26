const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/koablog',(err,db)=>{
    console.log("数据库连接成功")
});

//定义Schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//定义数据类型
const user = new Schema({
    user: { type: String, default: 'langge' },
    pass: { type: String,default: 'fffffffff' },
    sex: { type: String, default: 'boy' },
    describe: { type: String, default: '自我描述' },
    avatar: { type: String, default: 'null' },
    date: { type: Date, default: Date.now }
})
exports.Users = mongoose.model("users",user);
// Users = mongoose.model("users",user);
// exports.Users.index({name:1})

// const Users = mongoose.model("users", user);

// const modeluser = new Users();

//增
// modeluser.save(function(){
//     console.log('kkkkkkkkkkkkkk')
// })
// const user1 = {
//     user: "dddddddd",
//     pass: "dddddddddd",
//     sex: "boy1",
//     describe: "hhhhhhhhhhhhhhhhhhhhhh",
//     avatar: "jjjjjjjjjjjjjjjjj"
// }
// Users.create(user1, async ()=> {
//    await console.log('kkkkkkkkkkkkkk')
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




