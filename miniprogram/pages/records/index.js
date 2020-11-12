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
        records: recordFormat(listData),
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
    this.getAllRecords().then(value => {
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
        records: recordFormat(listData),
        recordDateArray: sortRecordArray,
      });

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

  getAllRecords: async function() {

     return wx.cloud.callFunction({
       name: 'money',
       data: {
         action: 'batch_records_list',
       }});


    // const db = wx.cloud.database();
    // const MAX_LIMIT = 100;
    // const data = async (event, context) => {
    //   // 先取出集合记录总数
    //   const countResult = await db.collection('money').count();
    //   const total = countResult.total;
    //   console.log('所以 counnt 是多少??? ', total);
    //   // 计算需分几次取
    //   const batchTimes = Math.ceil(total / 100);
    //   // 承载所有读操作的 promise 的数组
    //   const tasks = [];
    //   for (let i = 0; i < batchTimes; i++) {
    //     console.log('money : ', i, MAX_LIMIT);
    //     //获取某个集合中的所有记录,但是小程序端中默认只能获取20条数据且最多是20条
    //     // 哈哈哈哈 又来限制
    //     const promise = db.collection('money').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
    //     tasks.push(promise);
    //   }
    //   // 等待所有
    //   return (await Promise.all(tasks)).reduce((acc, cur) => {
    //     console.log('这里来搞什么了呀::: ');
    //     return {
    //       data: acc.data.concat(cur.data),
    //       errMsg: acc.errMsg,
    //     };
    //   });
    // };
    //
    // return data();
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
