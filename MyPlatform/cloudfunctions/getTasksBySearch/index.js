// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const tasks = db.collection('tasks');
  var value = event.value;

  var res = 0;

  if(value == "")
  {
    res = await tasks.get();
  }
  else{
    res = await  tasks.where({
      title: db.RegExp({
        regexp: '.*'+value+'.*',
        options: 'i'
      })
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