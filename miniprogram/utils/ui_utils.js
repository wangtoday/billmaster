const app = getApp();

export const tabbarController = (tabBar) => {

  const { userInfo } = app.globalData;

  tabBar.setData({
    list: [
      tabBar.data.list[0],
      {
        ...tabBar.data.list[1],
        dot: !userInfo,
      },
    ],
  });

};
