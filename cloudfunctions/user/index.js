// 云函数入口文件
const cloud = require('wx-server-sdk');

const getUserInfo = require('./get_user_info');

// define api action here:
const GET_USER_INFO = 'GET_USER_INFO';

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const { action, data: userInfo } = event;

  console.log('action', userInfo);

  switch (action) {
    case GET_USER_INFO:
      return getUserInfo(cloud, userInfo);

    default:
      return null;

  }

};
