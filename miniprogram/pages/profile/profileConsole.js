const app = getApp();

Page({
  data: {
    userInfo: {},
    activeDate: null,
    records: null,
  },
  onLoad: function() {
    console.log('load me profile');
    //  进入的时候, 获取用户的数据,
    // 包含 用户头像, 用户名称, 已有record, 设置
    this.setData({ userInfo: app.globalData.userInfo });
    // activeDate 和  records 异步拿取
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'GET_USER_INFO',
      },
      success: res => {
        const { result: { create_date, records } } = res;
        this.setData({
          activeDate: create_date,
          records: records,
        });
      },
    });
  },
  logout: function() {
    app.globalData.userInfo = null; // 清空 global 中的 userInfo 信息
    wx.navigateBack();
    return;
  },
});
