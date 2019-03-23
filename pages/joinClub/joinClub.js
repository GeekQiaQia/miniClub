// pages/joinClub/joinClub.js
const app=getApp();
const {url:{GET_INFO}} =require('../../config/url');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      clubInfo:{},
      joinPeople:1,
      img:'../../resources/mapTip.png',
      joinMember:[]
  },
    bindJoinClub(e){
    let _this=this
    console.log(e);
    wx.getSetting({
        success(res) {
            if(res.authSetting['scope.userInfo']){
                wx.getUserInfo({
                    success(res) {
                        console.log(res);

                    },
                    fail(res) {
                        console.log(res);
                    },
                    complete(res) {
                        console.log(res);
                        let joinedMemberInfo=res.userInfo;

                        // 存储到数据库； // 暂时存储本地；
                        let joinMember=[];
                        if(joinedMemberInfo.gender===1){
                            joinedMemberInfo.gender='男'
                        }else {
                            joinedMemberInfo.gender='女'
                        }

                        joinMember.push(joinedMemberInfo)
                        _this.setData({
                            joinMember,
                            joinPeople:joinMember.length
                        })


                    }
                })
            }
        },
        fail(res) {

          },
        complete(res) {

          }
    })

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let _this=this;
      console.log(options);
      let queryId=options.id;

      // 根据id 回显当前clubInfo ;
      this.setData({
          clubInfo:app.globalData.joinClubInfo[0]
      })
      // 根据openId 查找创建者，usersModel.findByOpenId();
      let openId=app.globalData.open_id;
      wx.request({
          url:GET_INFO,
          method:"POST",
          data:{
            openId:openId
          },
          success(res) {

            },
          fail(res) {

          },
          complete(res) {
          console.log(res);
          if(res.data.code==='0000'){

            let joinedMemberInfo=res.data.result;
              let joinMember=[];
              if(joinedMemberInfo.gender===1){
                  joinedMemberInfo.gender='男'
              }else {
                  joinedMemberInfo.gender='女'
              }

              joinMember.push(joinedMemberInfo)
              _this.setData({
                  joinMember,
                  joinPeople:joinMember.length
              })
          }


          }


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