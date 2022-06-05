// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var awardList = [];
  var imageIdList = [];
  var imageUrlList = [];

  var awards = db.collection('awards');
  var res = await awards.get({});
  awardList = res.data;

  for(var i=0;i<res.data.length;i++)
  {
    imageIdList.push(res.data[i].imageId);
  }

  const returnFileList = await cloud.getTempFileURL({
    fileList: imageIdList
  });

  for(var i=0;i<awardList.length;i++)
  {
    awardList[i].imageUrl = returnFileList.fileList[i].tempFileURL;

  }

  return {
    awardList:awardList
  }

}