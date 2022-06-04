// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  tasks = db.collection("tasks");
  res = await tasks.get();
  var taskList = res.data;
  var imageIdList = [];
  for(var i=0;i<taskList.length;i++)
  {
    imageIdList.push(taskList[i].imageId)
  }
  const imageUrlList = await cloud.getTempFileURL({
    fileList:imageIdList
  })
  var markerList=[]
  for(var i=0;i<taskList.length;i++)
  {
    markerList.push({
      id:i,
      width:"35",
      height:"35",
      iconPath:imageUrlList.fileList[i].tempFileURL,
      latitude:taskList[i].addressLatitude,
      longitude:taskList[i].addressLongtitude,
      label:{
        content: taskList[i].title,
        color:"#19b5bc",
        textAlign:"center",
        fontSize: "20"
      }
    })
  }
  return {
    markerList: markerList,
    taskList: taskList
  }
}