// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const news = db.collection('news');

  var newsId = event.newsId;

  var res = await news.where({
    _id: newsId
  }).get();

  var currentNews = res.data[0];

  var imageUrlList = [];

  const imageUrlResList = await cloud.getTempFileURL({
    fileList: currentNews.images
  });

  for(var i=0;i<imageUrlResList.fileList.length;i++)
  {
    imageUrlList.push(imageUrlResList.fileList[i].tempFileURL);
  }

  return{
    news: currentNews,
    imageUrlList: imageUrlList
  }

}