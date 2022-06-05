// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const openId = event.userInfo.openId;
  var task = event.task;
  var tasks = db.collection('tasks');

  var res = await tasks.where({
    _id: task._id
  }).update({
    data:{
      view: task.view + 1
    }
  })

  return res;
}