/*
* 包装一个微信请求的函数：
* 唯一全局变量wx;
*
*
* */
const {BaseUrl,port}=require('../config/url');

function responseInterceptor(res) {
    let cookies = res.header['Set-Cookie'];
    if (cookies) {
        let token = cookies.split(';')[0];
        let sign = cookies.split(';')[2].split(',')[1];
        // 存到本地
        wx.setStorageSync('cookie', token + ';' + sign);
    }
    // koa:sess=1545490202175-YuQBNeuWhkEXrjYQFLy8KhuY7YR6ZRvB; path=/; httponly,koa:sess.sig=SglxkPNpKoABn8konwZdptKltX4; path=/; httponly
}
const COOKIE_NAME = 'cookie';


function requestInterceptor(header) {
    let cookieValue = wx.getStorageSync('cookie');
    if (cookieValue) {
        header[COOKIE_NAME] = cookieValue;
    }
}


var obj={};
obj.fetch=function(url,options={}){
    return new Promise(function (resolve,reject) {
        wx.showLoading({
            title:'loading...'
        });
        options.method=options.method||'get';
        options.header=options.header||{};

        url=`${BaseUrl}${port}url`;

        requestInterceptor(options.header);
        wx.request({
            ...options,
            url,
            success(res){
                // 响应拦截器
                responseInterceptor(res);
                resolve(res);
            },
            fail:reject,
            complete:wx.hideLoading

        })

    })
}

module.exports=obj;