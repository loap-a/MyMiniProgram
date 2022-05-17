// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    passwd:'',
    phoneNumber:'',
    company:'',
    location:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleUserName(event){
    this.setData({
      userName:event.detail.value
    })
    console.log(this.data.userName)
  },
  handlePasswd(event){
    this.setData({
      passwd:event.detail.value
    })
    },
handlePhoneNumber(event){
    this.setData({
      phoneNumber:event.detail.value
    })
  },
register(){
  let userName = this.data.userName;
  let passwd = this.data.passwd;
  let phoneNumber = this.data.phoneNumber;

  console.log("点击注册");

  if(userName.length<4){wx.showToast({icon:'none', title:'用户名至少4位'})}

  wx.cloud.database().collection('user').add({
    data:{
      userName:userName,
      passwd:passwd,
      phoneNumber:phoneNumber
    },
    success(res){
      console.log('注册成功',res)
      wx.showToast({
        title:'success'
      })
    }
  })

}


})