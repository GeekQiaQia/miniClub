// pages/mapLocation/mapLocation.js
// 引入SDK核心类
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
let qqmapsdk;

const app=getApp();



Page({

  /**
   * 页面的初始数据
   * address
   :
   "北京市东城区东长安街"
   errMsg
   :
   "chooseLocation:ok"
   latitude
   :
   39.90374
   longitude
   :
   116.397827
   name
   :
   "天安门广场"
   */
  data: {
    latitude: '39.90374',
    longitude: '116.397827',
      chooseAddress:'#天安门广场# 北京市东城区东长安街',
    markers: [],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: './image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: './image/location.png'
    }]
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  backToCreateClub:function(){
    wx.navigateTo({
      url: '/pages/createClub/createClub',
    })
  },
    chooseLocation:function(){
        var _this = this;
        wx.chooseLocation({
            success(res) {
                console.log(res);
                const latitude = res.latitude;
                const longitude = res.longitude;
                const name=res.name;
                app.globalData.chooseAddress='#'+res.name+'#'+' '+res.address;
                let marker=[{
                    id:1,
                    longitude,
                    latitude,
                    name
                }]
                _this.setData({
                    longitude,
                    latitude,
                    chooseAddress:app.globalData.chooseAddress,
                    markers:marker

                })



            },
            fail(res) {
            },
            complete(res) {
            }
        })
    },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
    searchLoc:function(e){
    console.log(e);
    this.chooseLocation();

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        let _this=this;
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
          key: 'EXUBZ-FEC65-5PIIL-QTNCW-E44QQ-F5BJ5'
      });
      this.chooseLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
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