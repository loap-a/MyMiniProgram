// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = event.userInfo.openId;
  var nickName = event.nickName;
  var avatarId = event.avatarId;

  var users = db.collection('users')
  var res = await users.where({
    _openid: openId
  }).update({
    data:{
      nickName:nickName,
      avatarId:avatarId
    }
  })
  return res;
}