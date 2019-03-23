// pages/profile/profile.js
const regeneratorRuntime=require('../../packages/runtime');
const {fetch} =require('../../utils/request');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      signature:''
  },
    async clearLocalStorage(){
        wx.showLoading({
            title: '处理中...',
            mask:true

        })

        console.log('into clearLocalStorage');
    await wx.clearStorage({
        success(res) {
            console.log(res.errMsg);

          },
        fail(e) {
            console.log(e);
        },
        complete(res){
            wx.hideLoading();
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
            })
        }
    })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(app.globalData.accountInfo);
     this.setData({
         signature: app.globalData.accountInfo.signature
     });
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