// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const news = db.collection('news');

  var res = await news.get();
  var newsList = res.data;
  

  var tempFileIdList = [];
  var imageUrlList = [];

  if(newsList.length>0){
  for(var i=0;i<newsList.length;i++)
  {
    tempFileIdList.push(newsList[i].imageId);
  }
  const imageUrlResList = await cloud.getTempFileURL({
    fileList: tempFileIdList
  });

  for(var i=0;i<imageUrlResList.fileList.length;i++)
  {
    imageUrlList.push(imageUrlResList.fileList[i].tempFileURL);
  }
  }

  return {
    newsList: newsList,
    imageUrlList: imageUrlList
  }

}