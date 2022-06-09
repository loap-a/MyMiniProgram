// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const news = db.collection('news');
  var value = event.value;


  var res = 0;

  if(value == "")
  {
    res = await news.get();
  }
  else{
    res = await  news.where({
      title: db.RegExp({
        regexp: '.*'+value+'.*',
        options: 'i'
      })
    }).get();
  }

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