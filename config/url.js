/*
* @Author:max bai
  @Date:2019/3/22
  @Last Modified by :max bai
  @Last Modiified time:2019/3/22
**/
    const BaseUrl='http://127.0.0.1:';
    const port='3000';

module.exports={
     url:{
         LOGIN:`${BaseUrl}${port}/users/login`,
         GETINFO:`${BaseUrl}${port}/users/getUnionId`,
         GET_INFO:`${BaseUrl}${port}/users/getInfo`,
         CREATE_CLUB:`${BaseUrl}${port}/club/create`,
         GET_MYCLUB:`${BaseUrl}${port}/club/retrieve`,
     }

}