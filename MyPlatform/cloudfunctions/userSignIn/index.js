// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const openId = event.userInfo.openId;

  const users = db.collection('users');

  var today = event.today;

  users.where({
    _openid: openId
  }).update({
    data:{
    signDates: _.push(today),
    score: _.inc(1)
    }
  })

  return today;
}