Page({
  data: {
    start: "",
    stop: "",
    theme: {
        bg: "#409efe",
        fontColor: "#fff",
        rangeStartColor: "#79bbff",
        rangeColor: "#b3d8ff",
        rangeEndColor: "#79bbff"
    },
    actives: [
        {date: "2022-05-24", text: "￥1333.3"}
    ],/*指定允许选择的日期*/
    date: "",
  },
  onLoad () {

  },
  select ({detail}) {
    this.setData({ date: detail.text });
    this.offCalendar();
  },
  openCalendar () {
    this.setData({calendarShow: true});
  },
  offCalendar () {
    this.setData({ calendarShow: false });
  }


})