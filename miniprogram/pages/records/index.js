const app = getApp();

import { tabbarController } from '../../utils/ui_utils';

Page({
  data: {
    records: [],
    height: '0rpx',
    icon: '',
  },
  onLoad: function() {
    console.log('get the data');
    // 1. 获取数据库引用
    const db = wx.cloud.database();
    const bthis = this;
    // 2. 构造查询语句
    db.collection('money').where({}).get({
      success: function(res) {
        // 输出 [{ "title": "The Catcher in the Rye", ... }]

        const { data } = res;

        bthis.setData({
          records: data,
        });
        console.log('设置 打他', data, bthis.data.records);
      },
    });
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }

    tabbarController(this.getTabBar());

    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = (clientHeight - 60) * ratio;
        console.log('高度::: ', height);
        that.setData({
          height: height + 'rpx',
        });
      },
    });

  },
  upper(e) {
    console.log(e);
  },

  lower(e) {
    console.log(e);
  },

  scroll(e) {
    console.log(e);
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0,
    });
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200,
        });
        break;
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10,
    });
  },
});
