const app = getApp();

Page({
  data: {},
  onLoad: function() {
    //  进入的时候, 获取用户的数据,
    // 包含

  },
  logout: function() {
    app.globalData.userInfo = {};
    console.log('返回上一页');
    wx.navigateBack();
    return;
  },
});
