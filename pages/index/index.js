//获取应用实例
const app = getApp()
const {url:{GET_MYCLUB}}=require('../../config/url');


Page({

  /**
   * 页面的初始数据
   */
  data: {
      motto: 'Hello World',
      createdClubNo:false,
      userInfo: {},
      hasUserInfo: false,
      img:'../../resources/mapTip.png',
      clubBtnSelected:'joinClub',
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      myClubInfo:[],
      clubInfo: []
  },
    bindJoinClub:function(e){
        console.log(this.data.clubInfo,e);
        let id=e.currentTarget.id;
        let url=`../joinClub/joinClub?id=${id}`;
        let _clubInfo=this.data.clubInfo;
        console.log(_clubInfo);
        app.globalData.joinClubInfo=_clubInfo.filter(function (item,index,arr) {
            return item._id===id;
        });
        wx.navigateTo({
            url
        })
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    createClub:function(){
        wx.navigateTo({
            url: '../createClub/createClub',
        })
    },
    switchTabContent:function(e){
        console.log('into the switchTabContent');
        console.log(e);
        this.setData({
            clubBtnSelected:e.target.dataset.type
        });

    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (app.globalData.userInfo) {
          this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
          })
      } else if (this.data.canIUse){
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
              this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
              })
          }
      } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
              success: res => {
                  app.globalData.userInfo = res.userInfo
                  this.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                  })
              }
          })
      }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      let _this=this;
      let open_id= app.globalData.open_id;
      // 发起创建请求，向数据库存入该用户创建的club;
      wx.request({
          url:GET_MYCLUB,
          method:'POST',
          data:{
              openId:open_id
          },
          success(res) {
              console.log(res);
             let clubInfoLen=res.data.clubInfo[0].length;
             console.log(clubInfoLen);
              if(res.data.code==='0000'&&clubInfoLen>0){
                  _this.setData({
                      createdClubNo:true,
                      myClubInfo:res.data.clubInfo[0],
                      clubInfo:res.data.clubInfo[0]
                  });
              }else{
                  _this.setData({
                      createdClubNo:false
                  });
              }

          },
          fail(res) {

          },
          complete(res) {

          }
      })
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