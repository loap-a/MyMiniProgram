// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const messages = db.collection('messages');
  var user1 = event.user1;
  var user2 = event.user2;


  // var currentUser = event.currentUser;

  var res = await messages.where({
    user1: user1,
    user2: user2
  }).get({});
  if(res.data.length==0)
  {
    var curTime = event.curTime;
    var user1Name = event.user1Name;
    var user2Name = event.user2Name;
    await messages.add({
      data:{
        user1: user1,
        user2: user2,
        user1Nmae:user1Name,
        user2Name:user2Name,
        messages:[{
          activte:"2",
          message:"你好, 我是"+user2Name,
          time: curTime
        }]
      }
    });
    
    return {
      messages: [{
        activte:"2",
        message:"你好, 我是"+user2Name,
        time: curTime
      }]
    }
  }

  return {
    messages: res.data[0].messages
  }
}