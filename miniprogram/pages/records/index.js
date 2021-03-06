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
    const recordGlobalThis = this;
    this.getAllRecords().then(value => {
      console.log('结果在哪里::: ', value);
      const { result: { data: listData } } = value;

      db.collection('record_type').get({
        success: function(res) {
          const { data } = res;
          recordGlobalThis.setData({
            records: recordFormat(iconFormat(listData, listToObj(data))),
          });
        },
      });

      const recordArray = Object.keys(recordFormat(listData));
      const sortRecordArray = recordArray.sort(function(a, b) {
        return dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
      });

      this.setData({
        // records: recordFormat(listData),  note: todo:  这里有 bug 啊!
        recordDateArray: sortRecordArray,
      });

    });

    // 2. 构造查询语句
    // db.collection('money').get({
    //   success: (res) => {
    //     const { data: listData } = res;
    //     //3 . 这次有结果的时候, 进行第三个数据的获取
    //     // 但是不用等结果, 用 地址传递的方式来操作就好
    //
    //     const recordGlobalThis = this;
    //     db.collection('record_type').get({
    //       success: function(res) {
    //         const { data } = res;
    //         recordGlobalThis.setData({
    //           records: recordFormat(iconFormat(listData, listToObj(data))),
    //         });
    //       },
    //     });
    //
    //     const recordArray = Object.keys(recordFormat(listData));
    //     const sortRecordArray = recordArray.sort(function(a, b) {
    //       return dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
    //     });
    //
    //     this.setData({
    //       records: recordFormat(listData),
    //       recordDateArray: sortRecordArray,
    //     });
    //
    //   },
    // });

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
      tabbarController(this.getTabBar());
    }

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

    const db = wx.cloud.database();

    // 2. 构造查询语句
    // db.collection('money').get({
    //   success: (res) => {
    //     const { data: listData } = res;
    //     //3 . 这次有结果的时候, 进行第三个数据的获取
    //     // 但是不用等结果, 用 地址传递的方式来操作就好
    //
    //     const recordGlobalThis = this;
    //     db.collection('record_type').get({
    //       success: function(res) {
    //         const { data } = res;
    //         recordGlobalThis.setData({
    //           records: recordFormat(iconFormat(listData, listToObj(data))),
    //         });
    //       },
    //     });
    //
    //     const recordArray = Object.keys(recordFormat(listData));
    //     const sortRecordArray = recordArray.sort(function(a, b) {
    //       return dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
    //     });
    //
    //     this.setData({
    //       records: recordFormat(listData),
    //       recordDateArray: sortRecordArray,
    //     });
    //
    //   },
    // });

    console.log('来啦::: ');
    const recordGlobalThis  = this;
    this.getAllRecords().then(value => {
      const { result: { data: listData } } = value;

      db.collection('record_type').get({
        success: function(res) {
          const { data } = res;
          console.log(recordFormat(iconFormat(listData, listToObj(data))));
          recordGlobalThis.setData({
            records: recordFormat(iconFormat(listData, listToObj(data))),
          });
        },
      });

      const recordArray = Object.keys(recordFormat(listData));
      const sortRecordArray = recordArray.sort(function(a, b) {
        return dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
      });

      this.setData({
        // records: recordFormat(listData),
        recordDateArray: sortRecordArray,
      });

    });

  },
  upper(e) {
  },

  lower(e) {
  },

  scroll(e) {
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0,
    });
  },
  /**
   *  从云端返回数据, 需要 .then 激活
   * @returns {Promise<ICloud.CallFunctionResult>}
   */
  getAllRecords: async function() {
    /**
     * 从云端拿取数据
     */
    return wx.cloud.callFunction({
      name: 'money',
      data: {
        action: 'batch_records_list',
      },
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
