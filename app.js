//app.js
const regeneratorRuntime=require('./packages/runtime');
// const request=require('./utils/request');
// const {baseUrl}=require('./config');
// request.setBaseURL(baseUrl);
const {url:{LOGIN,GETINFO,GET_INFO}}=require('./config/url');

App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                let _this=this;
                console.log(res);
                    if(res.code){
                        wx.request({
                            url:LOGIN,
                            method:'POST',
                            data:{
                                code:res.code
                            },
                            success(res){
                                console.log(res);
                                let open_id=res.data.open_id;
                                _this.globalData.open_id=open_id;
                            }
                        })
                    }
                },
            fail(res) {
                console.log(res);
                },
            complete(res) {
                console.log(res);
                },
        })
        // 获取用户信息
        wx.getSetting({

            success: res => {
                let _this=this;
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            console.log(res);
                            // 可以将 res 发送给后台解码出 unionId
                            // 获取uinonId ; 判断是否同一用户，对同一个微信开放平台下的不同应用，unionid是相同的。
                            this.globalData.userInfo = res.userInfo;
                            wx.request({
                                url:GETINFO,
                                method:'POST',
                                data:{
                                    res:res
                                },
                                success(res){
                                    console.log(res);
                                }
                            })
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        },
                        fail(res) {
                        },
                        complete(res) {
                            console.log(res);
                            let openId=_this.globalData.open_id;
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

                                        let accountInfo=res.data.result;
                                        if(accountInfo.gender===1){
                                            accountInfo.gender='男'
                                        }else {
                                            accountInfo.gender='女'
                                        }

                                      _this.globalData.accountInfo=accountInfo;
                                        // console.log( _this.globalData.accountInfo);
                                    }


                                }


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
    globalData: {
        userInfo: null,
        accountInfo:{},
        open_id:'',
        chooseAddress:'',
        chooseTheme:'',
        joinClubInfo:'',
        signature:''
    },
    // request,
    // regeneratorRuntime
})