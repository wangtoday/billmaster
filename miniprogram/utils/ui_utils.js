import { Dayjs } from 'dayjs';

const dayjs = require('dayjs'); // 引入 dayjs

const app = getApp();

/**
 * 传入的是全局的 tabbar
 * 这里直接进行控制 tabbar 的红点
 * @param tabBar
 */
export const tabbarController = (tabBar) => {

  const { userInfo } = app.globalData;
  console.log(tabBar);
  tabBar.setData({
    list: [
      tabBar.data.list[0],
      tabBar.data.list[1],
      {
        ...tabBar.data.list[2],
        dot: !userInfo,
      },
    ],
  });

};

/**
 * 把数组 按照日期打平 变成
 * {
 *   date: []
 * }
 * 这种类型的 key value
 * @param res document db 返回的生数据
 */
export const recordFormat = (res) => {
  const mapObj = {};
  for (let index = 0; index < res.length; index++) {
    const groupDateCursor = dayjs(res[index].date).format('YYYY-MM-DD');
    if (!mapObj[groupDateCursor]) {
      mapObj[groupDateCursor] = [];
    }
    mapObj[groupDateCursor].push({
      ...res[index],
      date: dayjs(res[index].date).format('YYYY/MM/DD HH:MM'),
    });
  }
  return mapObj;
};

export const iconFormat = (originalRes, iconMap) => {
  originalRes.map(item => {
    if (item.icon) {
      item.iconName = iconMap[item.icon].icon;
    }

  });

  return originalRes;
};

/**
 * 把返回的 list 数据变成 以 id 开头的 object
 * @param res list response
 */
export const listToObj = (res) => {
  const mapObj = {};
  for (let index = 0; index < res.length; index++) {
    mapObj[res[index]._id] = res[index];
  }
  return mapObj;
};
