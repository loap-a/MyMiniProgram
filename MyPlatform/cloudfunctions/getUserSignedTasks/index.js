// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = event.userInfo.openId;

  const users = db.collection('users');
  const tasks = db.collection('tasks');

  var res = await users.where({
    _openid: openId
  }).get();
  var user = res.data[0];
  var signedTasks = user.signedTasks;
  var signedTasksId = [];
  for(var i=0;i<signedTasks.length;i++)
  {
    signedTasksId.push(signedTasks[i].taskId);
  }

  res = await tasks.where({
    _id: _.in(signedTasksId)
  }).get();

  var tasks_ = res.data;
  var dateList = [];
  var imageUrlList = [];
  var imageIdList = [];
  for(var i=0;i<tasks_.length;i++)
  {
    imageIdList.push(tasks_[i].imageId);

    for(var j=0;j<signedTasks.length;j++)
    {
      if(signedTasks[j].taskId == tasks_[i]._id)
      {
        dateList.push(signedTasks[j].date);
      }
    }
  }

  res = await cloud.getTempFileURL({
    fileList: imageIdList
  })

  for(var i=0;i<res.fileList.length;i++)
  {
    imageUrlList.push(res.fileList[i].tempFileURL)
  }

  return{
    tasks: tasks_,
    dateList: dateList,
    imageUrlList: imageUrlList
  }
}