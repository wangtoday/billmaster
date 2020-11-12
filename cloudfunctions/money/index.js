// 云函数入口文件
const cloud = require('wx-server-sdk')

const listRecords = require('./list_records');

// define api action here:
const BATCH_RECORDS_LIST = 'batch_records_list';

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {action} = event;

  console.log('action',event.action);

  switch (action) {
    case BATCH_RECORDS_LIST:
      return listRecords(cloud)

    default:
      return null

  }

}
