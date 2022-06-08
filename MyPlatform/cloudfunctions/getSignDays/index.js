// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = event.userInfo.openId;
  var signIn = db.collection('signIn');
  var res = await signIn.where({
    _openid: openId
  }).get();
  var userSignDates = res.data[0].dates;
  var returnUserSignDates = [];
  for(var i=0;i<userSignDates.length;i++)
  {
    returnUserSignDates.push({
      date: userSignDates[i],
      text: '已签到'
    })
  }
  return returnUserSignDates;
}