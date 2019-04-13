// pages/detail/detail.js
import * as echarts from '../../packages/ec-canvas/echarts';

const app = getApp();
function initChart(canvas, width, height,recordData) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });

    canvas.setChart(chart);

    var option = {
        backgroundColor: "#ffffff",
        color: ["#14DA12","#DA0D07","#FFDB5C" ],
        series: [{
            label: {
                normal: {
                    fontSize: 14
                }
            },
            labelLine:{
                normal:{
                    length:5,  // 改变标示线的长度
                    lineStyle: {
                        color: "black"  // 改变标示线的颜色
                    }
                },
            },
            name:'赴约记录',
            type: 'pie',
            center: ['50%', '50%'],
            radius: [0, '60%'],
            data:[],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 2, 2, 0.3)'
                }
            }
        }]
    };

    option.series[0].data=recordData;
    chart.setOption(option);
    return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
      signature:'',
      comment:{name:'科比',content:'打篮球我谁都不服'},
      dateRecord:{appoint:'9',stand:'1'},
      ec: {
      },
      recordData:[{
          value: 9,
          name: '赴约'
      }, {
          value: 1,
          name: '爽约'
      },{
          value: 2,
          name: '取消'
      }
      ]
  },

    echartInit(e) {
       console.log(e);
       let recordData=e.target.dataset.record;
        initChart(e.detail.canvas, e.detail.width, e.detail.height,recordData);
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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