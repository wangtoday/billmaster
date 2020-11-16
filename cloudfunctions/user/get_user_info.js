const dayjs = require('dayjs');

const get_user_info = async (cloud,userInfo) => {
  const wxContext = cloud.getWXContext()
  const {
    OPENID: openId
  } = wxContext;
  // 查询数据库 表中是否又 user 这个info
  const db = cloud.database()

  const {
    data
  } = await db.collection('user').where({
    openid: openId
  }).get();

  console.log('user Info: ', userInfo);

  if (data && data.length === 0) {
    // // 如果没有, 就在数据表里新建一个user
    try {
      const addStatus = await db.collection('user').add({
        data: {
          openid: openId,
          active_status: false,
          create_stamp: new Date(). getTime(),
          ...userInfo,
        }
      });
    } catch (e) {
        console.log('error: ', e)
    }
    // 第一次激活
    return {
      create_date: dayjs().format('YYYY-MM-DD'),
      records: 0
    }
  }else{
    // 已经有了该激活的用户, 那么就显示信息
    const {create_stamp} = data[0];
    // 查询 record 表, 看用户创建了多少个 records
    const {
      data:records
    } = await db.collection('record').where({user_id:openId}).get()

    return {
      create_date: dayjs(create_stamp).format('YYYY-MM-DD'),
      records: records.length
    }
  }






  // 如果是新建的, 那么就额外的添加一个 active: false
  // 如果有 但是 active 是false, 那么就改写成 true
  // return {
  //   nickName: '老子天下第一'
  // }
}

module.exports = get_user_info;
