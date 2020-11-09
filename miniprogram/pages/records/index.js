const app = getApp();
const dayjs = require('dayjs');
import { tabbarController, recordFormat, iconFormat, listToObj } from '../../utils/ui_utils';

Page({
  data: {
    recordDateArray: [],
    records: {},
    height: '0rpx',
    icon: '',
  },
  onLoad: function() {
    console.log('get the data');
    // 1. 获取数据库引用
    const db = wx.cloud.database();

    // 2. 构造查询语句
    db.collection('money').where({}).get({
      success: (res) => {
        const { data: listData } = res;
        //3 . 这次有结果的时候, 进行第三个数据的获取
        // 但是不用等结果, 用 地址传递的方式来操作就好

        const recordGlobalThis = this;
        db.collection('record_type').where({}).get({
          success: function(res) {
            const { data } = res;
            recordGlobalThis.setData({
              records: recordFormat(iconFormat(listData, listToObj(data))),
            });
          },
        });

        const recordArra = Object.keys(recordFormat(listData));
        const sortRecordArray = recordArra.sort(function(a, b) {
          console.log(a, b, '来了', dayjs(a).isBefore(dayjs(b)) ? 1 : -1);

          return dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
        });

        console.log(sortRecordArray);

        this.setData({
          records: recordFormat(listData),
          recordDateArray: sortRecordArray,
        });

      },
    });

    // Note: 下面这个无法运行, 原因是 无法在小程序端 运行这个lookup
    // 测试以后, 在服务端是可以的
    // db.collection('money').aggregate().lookup({
    //   from: 'record_type',
    //   localField: 'icon',
    //   foreignField: '_id',
    //   as: 'icon_info',
    // }).end().then(value=>{
    //   console.log('来来来::: ',value.data);
    // })
    //  所以使用双重的 call 来 获取 icon 吧
    // 然后使用 nick 之前告诉我的方法来进行就好了

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

        that.setData({
          height: height + 'rpx',
        });
      },
    });

  },
  upper(e) {
    // console.log(e);
  },

  lower(e) {
    // console.log(e);
  },

  scroll(e) {
    // console.log(e);
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0,
    });
  },

  // transferdToTitle(date_item) {
  //   return dayjs(date_item).format('YYYY-MM-DD');
  // },

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
