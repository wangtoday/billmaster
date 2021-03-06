import { iconFormat, listToObj, recordFormat, tabbarController } from '../../utils/ui_utils';
import { numberPad } from './config';

const dayjs = require('dayjs');
const app = getApp();

Page({
  data: {
    amount: 0,
    height: 0,
    selected: 1,
    selectedIcon: 0,
    recordType: null,
    previousAction: null,
    numberArray: numberPad,
    iconNumber: [],
  },

  onLoad: function() {

  },

  onShow: async function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
      tabbarController(this.getTabBar());
    }

    // 因为 tabbar 的原因: 设置内部高度,
    wx.getSystemInfo({
      success: (res) => {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = (clientHeight - 60) * ratio;

        this.setData({
          height: height,
        });
      },
    });
    const { result: { openid: oid } } = await wx.cloud.callFunction({
      name: 'login',
      data: {},
    }).then(value => value);

    //  获取用户的 records by open id
    const db = wx.cloud.database();

    const { data } = await db.collection('record_type').where({ userid: oid }).get();

    this.setData({
      iconNumber: data,
    });
  },
  setSelectedIcon: function(e) {
    console.log(e);
    const {currentTarget:{dataset:{record_type:type,index:idx}}} = e;
    console.log(e, idx);
    this.setData({
      selectedIcon:idx,
      recordType:type
    })
  },
  bindToAmount: function(e) {
    this.setData({
      amount: e.detail.value,
    });
  },
  calculate: function(event) {

    let amount = this.data.amount;
    const previousAction = this.data.previousAction;
    const { currentTarget: { dataset: { value } } } = event;
    console.log('来了啊 啊哈哈', value);
    switch (value.action) {
      case 'number':
        if (previousAction) {
          if (previousAction === 'add') {
            this.setData({ amount: amount + value.value });
          } else {
            this.setData({ amount: amount - value.value > amount - value.value ? amount - value.value : 0 });
          }
          this.setData({ previousAction: null });
        } else {
          if (amount !== 0) {
            this.setData({ amount: amount * 10 + value.value });
          } else {
            this.setData({ amount: value.value });
          }
        }

        break;
      // case 'dot':
      //   this.setData({ amount: amount/10 + value.value });
      case 'save':
        console.log('提交数据了: ', this.data.amount);
        this.createRecord();
        break;
      case 'delete':
        this.setData({ amount: 0 });
        break;
      default:
      // this.setData({ previousAction: value.action });
      //    todo: 暂时先禁用 加减 小数 不然太麻烦了
    }
  },
  createRecord: function() {
    const db = wx.cloud.database();
    const amount = this.data.amount;
    const recordType = this.data.recordType;
    db.collection('money').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        account: '大家乐',
        currency: 'HKD',
        icon: recordType._id,
        open_id: recordType.userid,
        sub_type: recordType.value,
        // sub_type: '加油',
        amount: amount,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        // tags: [
        //   "cloud",
        //   "database"
        // ],
        // location: new db.Geo.Point(113, 23),
        // done: false
      },
    }).then(res => {
      console.log(res);
    });
  },

});
