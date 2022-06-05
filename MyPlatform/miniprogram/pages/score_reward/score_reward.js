// pages/score_reward/score_reward.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:10,
    awardList:[],
  },

  handleChange(e)
  {
    var that = this;
    var currentScore = this.data.score;
    var item = e.currentTarget.dataset.item;
    var score = e.currentTarget.dataset.item.score;
    if(this.data.score<score)
    {
      wx.showToast({
        title: '积分不足',
        icon:'error'
      })
      return;
    }

    wx.showModal({
      title: "积分兑换",
      content: "您确定要兑换 <"+item.name+"> 吗?",
      success: function(res){
        if(res.confirm)
        {
          that.setData({
            score: currentScore - score
          })
          app.globalData.score = currentScore - score;
          var paramScore = app.globalData.score;
          wx.cloud.callFunction({
            name: "updateScore",
            data:{
              paramScore: paramScore

            },
            success: function(res)
            {
            },
            fail: function(res){
            }
          })
          wx.showModal({
            title: "兑换成功",
            content: "请将兑换Key <"+item.key+"> 和您的地址一并发送到客服邮箱12345678@mail.com",
            showCancel: false,
            success: function(res){
              if(res.confirm)
              {
                that.onLoad();
              }
            }
            
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      score:app.globalData.score
    });
    var that = this;

    wx.cloud.callFunction({
      name:"getAwards",
      success:function(res){
        that.setData({
          awardList: res.result.awardList
        });

      }
    })
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

  }
})