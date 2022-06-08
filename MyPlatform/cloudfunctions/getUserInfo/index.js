// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var openId = event.userInfo.openId;
  var nickName="";
  var avatarId=[];
  var avatarUrl="";

  var users = db.collection('users');
  var res = await users.where({
    _openid: openId
  }).get({});

  var userSignDates = res.data[0].signDates;
  var actives = [];
  for(var i=0;i<userSignDates.length;i++)
  {
    actives.push({
      date: userSignDates[i],
      text: '已签到'
    })
  }

  avatarId.push(res.data[0].avatarId);
  const imageUrlList = await cloud.getTempFileURL({
    fileList:avatarId
  });

  avatarUrl = imageUrlList.fileList[0].tempFileURL;
  nickName = res.data[0].nickName ;
  score = res.data[0].score;
  return {
    nickName:nickName,
    avatarUrl:avatarUrl,
    score: score,
    actives: actives
  }

}