// import { DEFAULT_TYPES } from './default_record_type'; // note: import 可能不能通过编译
const DEFAULT_TYPES = require('./default_record_type');

const cloud = require('wx-server-sdk');
/**
 * 为用户创建一些默认的 record type
 * 创建到 db 的类型:
 *
 * @param userid 也就是 open id
 * @returns {Promise<void>}
 */
const createDefaultRecordType = async (userid) => {
  const defaultTypes = DEFAULT_TYPES;

  const insertType = defaultTypes.map(type => {
    return {
      ...type,
      userid: userid,
    };
  });
  await cloud.database().collection('record_type').add({
    data: insertType,
  });

};

module.exports = createDefaultRecordType;
