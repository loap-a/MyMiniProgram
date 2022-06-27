// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command;


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const messages = db.collection('messages');

  var openId = event.userInfo.openId;
  var res = await messages.where(_.or([{user1:openId},{user2:openId}])).get({});
  var all_talks = res.data;
  var message_numbers=[];
  var message_dates=[];
  var message_lastones=[];
  var message_name=[];   

  for(var i=0;i<all_talks.length;i++)
  {
    message_numbers.push(all_talks[i].messages.length-1);
    message_dates.push(all_talks[i].messages[all_talks[i].messages.length-1].time);
    message_lastones.push(all_talks[i].messages[all_talks[i].messages.length-1].message);
    if(all_talks[i].user1==openId)
    {
      message_name.push(all_talks[i].user2Name);
    }
    else
    {
      message_name.push(all_talks[i].user1Name);
    }
  }

  return {
      all_talks: all_talks,
      message_numbers: message_numbers,
      message_dates: message_dates,
      message_lastones: message_lastones,
      message_name: message_name
  }

}