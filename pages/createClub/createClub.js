// pages/createClub/createClub.js
const {getDay,formatDate,formatTime} =require('../../utils/util');
const app=getApp();
const {url:{CREATE_CLUB}}=require('../../config/url');

Page({

  /**
   * 页面的初始数据
   *
   */
  data: {
    theme:'',
    people:'',
    cost:'',
    describe:'',
    address:'',
    date: '2016-09-01',
    time: '12:01',
    day:'',
      show: true,
      dateInfo: {}
  },
  
    submit:function(e) {
        console.log(e);
        console.log('日期类型：' + e.detail.dateType)
        console.log('是否显示年份：' + e.detail.showYear)
        console.log('日期字符串：' + e.detail.dateStr)
        this.setData({
            dateInfo: e.detail
        })
    },
    showDatePickerPlus: function() {
        this.setData({
            show: true
        })
    },
    selectLocation:function(e){
      console.log(e);
       wx.navigateTo({
        url: '../mapLocation/mapLocation',
      })
    },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let day=getDay(e.detail.value);
    this.setData({
      date: e.detail.value,
        day
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
    bindInputChange:function(e){
        console.log(e);
       if(e.target.id=='theme'){
            app.globalData.chooseTheme=e.detail.value;
        }
        this.setData({
            [e.target.id]:e.detail.value
        })
    },
    formatLongWord:function(){
      let newWord='';
       let address= app.globalData.chooseAddress;
       if(address.length>16){
           address=address.substring(0,15);
           newWord=address+'...'
       }
      return newWord;
    },
    subClubInfo:function(e) {
        console.log(e);
        // 获取需要提交的数据：
       let{theme, people, cost, describe,date, time, day,} = this.data;
       let location=app.globalData.chooseAddress;
       let open_id=app.globalData.open_id;
       let clubInfo={open_id,theme, date, time, day,location, people, cost, describe};
        console.log(clubInfo);

       // 发起创建请求，向数据库存入该用户创建的club;
        wx.request({
            url:CREATE_CLUB,
            method:'POST',
            data:{
                clubInfo
            },
            success(res) {

            },
            fail(res) {

            },
            complete(res) {
                console.log(res);
                if(res.data.code==='0000'){
                    wx.showToast({
                        title:'创建成功'
                    })

                }
                wx.reLaunch({
                    url:'../index/index'
                })
            }
        })

    }
    ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

       this.setData({
           date:formatDate(new Date()),
           time:formatTime(new Date()),
           day:getDay(new Date()),
           address: this.formatLongWord(),
           theme:app.globalData.chooseTheme
       })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})