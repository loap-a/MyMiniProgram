// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var users = db.collection('users');

  const openId = event.userInfo.openId;

  var taskId = event.taskId;
  var date = event.date;

  var res = await users.where({
    _openid: openId
  }).get();

  var signedTasks = res.data[0].signedTasks;
  for(var i=0;i<signedTasks.length;i++)
  {
    if(taskId == signedTasks[i].taskId)
    {
      return 'fail'
    }
  }

  res = await users.where({
    _openid: openId
  }).update({
    data:{
      signedTasks: _.push({
        taskId: taskId,
        date: date
      })
    }
  })

  return 'success';
}