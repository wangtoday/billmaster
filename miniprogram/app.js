/** 21/10/2020
 *   作者: Wang
 *   功能: 项目的主入口, onLaunch 最先被 call 的方法
 *   这里面会进行 cloud 云开发的注册
 */

//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'ceshi01-cdb72a',
        traceUser: true,
      });
    }

    this.globalData = {
      name: '账师傅',
      userInfo: null
    }
  },
});
