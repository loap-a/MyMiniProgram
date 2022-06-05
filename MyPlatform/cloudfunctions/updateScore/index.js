// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var users = db.collection('users')

  var score = event.paramScore;
  const openId = event.userInfo.openId;

  var res = await users.where({
    _openid: openId
  }).update({
    data:{
      score: parseInt(score)
    }
  })
  return res
}