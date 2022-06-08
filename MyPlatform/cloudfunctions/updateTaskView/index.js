// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const openId = event.userInfo.openId;
  var taskId = event.taskId;
  var tasks = db.collection('tasks');

  var res = await tasks.where({
    _id: taskId
  }).update({
    data:{
      view: _.inc(1)
    }
  })

  return res;
}