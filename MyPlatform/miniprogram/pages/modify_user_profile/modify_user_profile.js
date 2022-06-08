// pages/modify_user_profile/modify_user_profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempAvatarPath:[],
    avatarImageId: [],
    nickName:""
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
  submit(){
    var that = this;
    if(this.data.nickName.length==0)
    {
      wx.showToast({
        title: '请输入昵称',
        icon:"error"
      })
      return
    }
    if(this.data.nickName.length<4)
    {
      wx.showToast({
        title: '昵称长度必须大于4',
        icon:"none"
      })
      return
    }

    if(this.data.avatarImageId.length==0)
    {
      that.setData({
        avatarImageId:['cloud://cloud1-2gva005o7c08f44d.636c-cloud1-2gva005o7c08f44d-1311808483/wx.png']
      })
    }

    console.log(that.data.avatarImageId)
    wx.cloud.callFunction({
      name:"modifyUserProfile",
      data:{
        nickName: that.data.nickName,
        avatarId: that.data.avatarImageId[0]
      },
      success: function(res)
      {
        wx.showToast({
          title: '修改成功',
          duration: 1000,
          success(){
            wx.switchTab({
              url: '../user/user',
              success: function () {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad(); //重新刷新device-info页面
              }
            })
          }
        })
      }
    })


  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.tempAvatarPath,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '确认',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.tempAvatarPath.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            tempAvatarPath: this.data.tempAvatarPath
          })
        }
      }
    })
  },

  ChooseImage() {
    var that=this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.avatarImageId.length != 0) {
          this.setData({
            tempAvatarPath: this.data.tempAvatarPath.concat(res.tempFilePaths)
          })
          
        } else {
          this.setData({
            tempAvatarPath: res.tempFilePaths
          })
        }

        const urls = res.tempFilePaths;
        var fileIDs = that.data.avatarImageId.length==0?[]:that.data.avatarImageId;

        for(var i=0;i<urls.length;i++)
        {
          var cloudPath="userAvatar/"+Date.now()+i+".jpg";
          wx.cloud.uploadFile({
            cloudPath,
            filePath: urls[i]
          }).then(res=>{
            fileIDs.push(res.fileID);
          })
        }
        that.setData({
          avatarImageId:fileIDs
        })

      }
    });
  },
})