// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const openId = event.userInfo.openId;
  var taskId = event.taskId;
  const tasks = db.collection('tasks');

  var res = await tasks.where({
    _id: taskId
  }).get()

  var task = res.data[0];

  var taskImageUrlList = [];
  var taskRaiserImageUrlList = [];

  var resImage = await cloud.getTempFileURL({
    fileList: task.images
  })
  for(var i=0;i< resImage.fileList.length;i++)
  {
    taskImageUrlList.push(resImage.fileList[i].tempFileURL);
  }

  if (task.raiserImages.length>0)
  {
  var resRaiserImage = await cloud.getTempFileURL({
    fileList: task.raiserImages
  })
  for(var i=0;i< resRaiserImage.fileList.length;i++)
  {
    taskRaiserImageUrlList.push(resRaiserImage.fileList[i].tempFileURL);
  }
}

var hasThumbed = false;
for(var i=0;i<task.thumbUser.length;i++)
{
  if (openId == task.thumbUser[i])
  hasThumbed = true;
}

return {
    task: task,
    taskImageUrlList: taskImageUrlList,
    taskRaiserImageUrlList: taskRaiserImageUrlList,
    hasThumbed: hasThumbed
}

}