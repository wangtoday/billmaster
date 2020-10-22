const app = getApp();

Page({
  data: {},
  onLoad: function() {

  },
  logout: function() {

    app.globalData.openid = null;
    app.globalData.userInfo = {};
    wx.navigateBack();
    return;
  },
});
