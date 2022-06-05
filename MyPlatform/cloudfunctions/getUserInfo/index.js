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
  var avatarURL="";

  var users = db.collection('users');
  var res = await users.where({
    _openid: openId
  }).get({});

  avatarId.push(res.data[0].avatarId);
  const imageUrlList = await cloud.getTempFileURL({
    fileList:avatarId
  });

  avatarURL = imageUrlList.fileList[0].tempFileURL;
  nickName = res.data[0].nickName ;
  score = res.data[0].score;
  return {
    nickName:nickName,
    avatarURL:avatarURL,
    score: score
  }

}