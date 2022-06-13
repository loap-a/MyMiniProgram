// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command;

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
    res = await tasks.where({
      _id: task._id
    }).get();
    if(res.data[0].thumbUser.indexOf(openId)==-1)
    {
    res = await tasks.where({
      _id: task._id,
    }).update({
      data:{
        thumbUp: _.inc(1),
        thumbUser: _.push(openId)
      }
    })
  }
  }
  else
  {
    var tempOpenIdList = task.thumbUser;
    tempOpenIdList.splice(tempOpenIdList.indexOf(openId),1)
    res = await tasks.where({
      _id: task._id,
      thumbUser: openId
    }).update({
      data:{
        thumbUp: _.inc(-1),
        thumbUser: _.pull(openId)
      }
    })
  }
  return res;
}