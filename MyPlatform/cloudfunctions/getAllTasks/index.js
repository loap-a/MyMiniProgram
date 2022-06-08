// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var tasks = db.collection('tasks');
  var res = await tasks.get({});
  var tempFileIdList = [];
  var imageUrlList = [];
  var taskList = res.data;
  for(var i=0;i<taskList.length;i++)
  {
    tempFileIdList.push(taskList[i].imageId);
  }
  const imageUrlResList = await cloud.getTempFileURL({
    fileList: tempFileIdList
  });

  for(var i=0;i<imageUrlResList.fileList.length;i++)
  {
    imageUrlList.push(imageUrlResList.fileList[i].tempFileURL);
  }

  return {
    taskList: taskList,
    imageUrlList: imageUrlList
  }

}