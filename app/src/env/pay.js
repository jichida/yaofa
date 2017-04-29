/**
 * Created by wangxiaoqing on 2017/3/27.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./pay.prod');//暂时调试
} else {
    module.exports = require('./pay.dev');
}