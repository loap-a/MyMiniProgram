// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var tasks = db.collection('tasks');
  var taskType  = event.type;
  var res = 0;
  if(taskType=='全部类型')
  {
    res = await tasks.get();
  }
  else{
  res = await tasks.where({
    taskType: taskType
  }).get();
  }
  var taskList = res.data;
  var tempFileIdList = [];
  var imageUrlList = [];

  if(taskList.length>0){
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
  }
  return {
    taskList: taskList,
    imageUrlList: imageUrlList
  }
}