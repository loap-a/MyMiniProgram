// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var users = db.collection('users');
  var tasks = db.collection('tasks');


  const openId = event.userInfo.openId;
  var comment = event.comment;
  var taskId = event.taskId;
  var today = event.today;
  var nickName = event.nickName;

  var res = await users.where({
    _openid: openId
  }).get();


  
  if(res.data.length == 0)
  {
    var addRes = await users.add({
      data:{
        _openid: openId,
        nickName: '微信用户',
        avatarId: 'cloud://cloud1-2gva005o7c08f44d.636c-cloud1-2gva005o7c08f44d-1311808483/wx.png',
        score: 1,
        signDates:[],
        signedTasks:[]
      }
    });
  }


  res = await tasks.where({
    _id: taskId
  }).update({
    data:{
      comments: _.push({
        date: today,
        content: comment,
        nickName: nickName
      })
    }
  })

  return {
    result: 'success',
    nickName: nickName
  }

}