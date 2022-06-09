// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var newsId = event.newsId;
  var news = db.collection('news');

  var res = await news.where({
    _id: newsId
  }).update({
    data:{
      view: _.inc(1)
    }
  })

  return res;
}