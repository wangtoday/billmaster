const list_records = async (cloud) => {

  const db = cloud.database();
  const data = async (event, context) => {
    const MAX_LIMIT = 100;
    // 先取出集合记录总数
    const countResult = await db.collection('money').count();
    const total = countResult.total;
    console.log('所以 counnt 是多少??? ', total);
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100);
    // 承载所有读操作的 promise 的数组
    const tasks = [];
    for (let i = 0; i < batchTimes; i++) {
      console.log('money : ', i, MAX_LIMIT);
      //获取某个集合中的所有记录,但是小程序端中默认只能获取20条数据且最多是20条
      // 哈哈哈哈 又来限制
      const promise = db.collection('money').limit(MAX_LIMIT).get();
      tasks.push(promise);
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      console.log('这里来搞什么了呀::: ');
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      };
    });
  };

  return data();
};

module.exports = list_records;
