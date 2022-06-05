// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const openId = event.userInfo.openId;
  var task = event.task;
  var plus = event.plus;
  var tasks = db.collection('tasks');
  var res = "";
  if(plus)
  {
    var tempOpenIdList = task.thumbUser;
    tempOpenIdList.push(openId);
    res = await tasks.where({
      _id: task._id
    }).update({
      data:{
        thumbUp: task.thumbUp + 1,
        thumbUser: tempOpenIdList
      }
    })
  }
  else
  {
    var tempOpenIdList = task.thumbUser;
    tempOpenIdList.splice(tempOpenIdList.indexOf(openId),1)
    res = await tasks.where({
      _id: task._id
    }).update({
      data:{
        thumbUp: tempOpenIdList.length,
        thumbUser: tempOpenIdList
      }
    })
  }
  return res;
}