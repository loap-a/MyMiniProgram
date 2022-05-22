// pages/tasks_detail/tasks_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTask:null,
    mainDetail:true,
    mainTime:false,
    mainNeed:false,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }],

    theme: {
        bg: "#409efe",
        fontColor: "#fff",
        rangeStartColor: "#79bbff",
        rangeColor: "#b3d8ff",
        rangeEndColor: "#79bbff",
        touchColor:"#67c147",
        isRound:"true"
      
    },
    // actives: [
    //   {date: "2022-05-24", text: "￥1333.3"}, //每个单元增加了text属性用于定义需要显示的文本
    //   {date: "2019-06-25", text: "￥998.01"},
    //   {date: "2019-06-26", text: "￥998.01"},
    //   {date: "2019-06-27", text: "￥998.01"}
    // ],
    availableDate:{
      start:"2022-05-01",
      end:"2022-05-31"
    },

    taskRaiser:{
      nickName:"南极神秘客",
      address:"宣武区著北纬路甲一号德云社",
      introduction:"擅长模仿",
      phoneNumber:"114514",
      imageURL:[
        // {
        //   id: 0,
        //   type: 'image',
        //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        // }, {
        //   id: 1,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        // }, {
        //   id: 2,
        //   type: 'image',
        //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        // }
      ]
    }

  },

  select ({detail}) {
    this.setData({ date: detail.text });
    console.log(this.data.date)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var currentTask = JSON.parse(options.task);
    this.setData({
      selectTask:currentTask
    });
  },

   handleTest(){
     wx.navigateTo({
       url:'../test/test'
     });
     console.log(123)
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
  handleSidebarDetail(){
    this.setData({
      mainDetail:true,
      mainTime:false,
      mainNeed:false,
    })
  },
  handleSidebarTime(){
    this.setData({
      mainDetail:false,
      mainTime:true,
      mainNeed:false,
    })
  },
  handleSidebarEmployee(){
    this.setData({
      mainDetail:false,
      mainTime:false,
      mainNeed:true,
    })
  }
})