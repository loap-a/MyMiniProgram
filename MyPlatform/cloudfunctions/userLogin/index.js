// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var users = db.collection('users');

  const openId = event.userInfo.openId;
  
  var res = await users.where({
    _openid: openId
  }).get();

  if(res.data.length == 0)
  {
    var addRes = await users.add({
      data:{
        _openid: openId,
        nickName: '微信用户',
        avatarId: 'cloud://cloud1-2gva005o7c08f44d.636c-cloud1-2gva005o7c08f44d-1311808483/wx.png',
        score: 1,
        signDates:[],
        signedTasks:[]
      }
    });

    var tempFileIdList = ['cloud://cloud1-2gva005o7c08f44d.636c-cloud1-2gva005o7c08f44d-1311808483/wx.png'];
    var imageRes = await cloud.getTempFileURL({
      fileList: tempFileIdList
    })
    return {
      nickName: '微信用户',
      avatarUrl: imageRes.fileList[0].tempFileURL,
      score: 1
    }
  }

  else{
    var tempFileIdList = [res.data[0].avatarId];
    var imageRes = await cloud.getTempFileURL({
      fileList: tempFileIdList
    })
    return {
      nickName: res.data[0].nickName,
      avatarUrl: imageRes.fileList[0].tempFileURL,
      score: res.data[0].score
    }
  }

}