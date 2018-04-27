const Users = require('../mongodb/mongo').Users;

module.exports={
    create:function (user){
        return Users.create(user);
    },
    getUserByName:function(name){
        return Users.findOne({user:name})
    }
}