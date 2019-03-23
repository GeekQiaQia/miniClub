// sign/sign.js
const regeneratorRuntime = require('../../packages/runtime');
const { fetch } = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  /**
   *  表单提交
   * */
  async doLogin() {
    // console.log('into login function');
    // let {username,password}=this.data;
    // //console.log('userName:',username);
    // //console.log('userPwd',password);
    //  let url='';
    //  let result= await fetch(url,{method:'post'});
    //  console.log(result);
    // 1、客户端登录；
      wx.login({
      success: async function (res) {
        console.log(res);
        // 2、将code 传递给服务器
        let data={
          method:'post',
          code:res.code
        }
        let result=await fetch(url,data);
        
      }// end success ;

    })

  },
  
  valueHandler(e) {
    //console.log(e);
    this.setData({
      [e.target.id]: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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