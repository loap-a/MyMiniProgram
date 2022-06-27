// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {

  const messages = db.collection('messages')

  var user1 = event.user1;
  var user2 = event.user2;
  var time = event.time;
  var activate = event.activate;
  var message = event.message;

  var res = await messages.where({
    user1:user1,
    user2:user2
  }).update({
    data:{
      messages: _.push({
        message: message,
        activate: activate,
        time:time
      })
    }
  })

}