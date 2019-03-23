// 得到时间格式；

//  得到时间格式；22:00
const formatTime = date => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return  [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 得到日期格式；2019-03-19
const formatDate=date=>{
    const year=date.getFullYear();
    const month=date.getMonth()+1;
    const day=date.getDate();

    return [year,month,day].map(formatNumber).join('-');
}
// 传入需要获取日期的参数；2019-03-19;
const getDay=(dates)=>{
    console.log(dates);
    let show_day=new Array('周日','周一','周二','周三','周四','周五','周六',)
    let date=new Date(dates);
    console.log(date);
    let day=date.getDay();
    console.log(day);
    return show_day[day];
}

module.exports = {
    formatTime: formatTime,
    formatDate:formatDate,
    getDay:getDay
}
