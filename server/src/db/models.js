let mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
let Schema       = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
const Chance = require('chance');
const chance = new Chance();
//系统设置
let SystemConfigSchema = new Schema({
    percentborrowpre: Number,//预借款金额比例
    percentborrowreal: Number,//实际借款金额比例
    timeexporder:Number,//超时时间（小时为单位）
    bonuslevel1:Number,//提成比例
    cancelcountperday:{ type:  Schema.Types.Number, default: 2 },
    cancelforpay:{ type:  Schema.Types.Number, default: 20 },
});
SystemConfigSchema.plugin(mongoosePaginate);
let SystemConfig  = mongoose.model('SystemConfig',  SystemConfigSchema);
// http://mongoosejs.com/docs/populate.html
//借款人
let UserBorrowerSchema = new Schema({
    username:String,
    passwordhash: String,
    passwordsalt: String,
    created_at: { type: Date, default:new Date()},
    updated_at: Date,
    profile:{ type: Schema.Types.Mixed,default:{
        nickname:`借款人${chance.string({length: 4,pool: '0123456789'})}`,
        avatar:'img/myprofile/1.png'},
        sex:'男'
    },
    useragencyfrom:{ type: Schema.Types.ObjectId, ref: 'UserAgency' },//中介
    //认证相关
    truename:String,  //真实用户名
    idcard:String,//身份证号
    phonenumber:String,//手机号
    phonepassword:String,//手机密码
    taobaoaccount:String,//淘宝账号
    taobaopassword:String,//淘宝密码
    urlphoneid1:String,//身份证照片正面
    urlphoneid2:String,//身份证照片反面
    urlphoneid3:String,//身份证照片手持

    resultphoto_obj:String,//照片认证错误原因
    resultphoto1_obj:String,//照片认证正面
    resultphoto2_obj:String,//照片认证反面
    resultid_obj:String,//身份认证错误原因
    resultphone_obj:String,//运营商认证错误原因
    resultzhima_obj:String,//芝麻分错误原因
    resulttaobao_obj:String,//淘宝错误原因
    resultrealname_obj:String,//实名认证错误原因
    resultphone_detail:String,
    resulttaobao_detail:String,
    resultid:{ type:  Schema.Types.Number, default: 0 },//身份认证,-1:失败，0,未递交，1：递交中，2：成功
    resultphoto:{ type:  Schema.Types.Number, default: 0 },//照片认证,-1:失败，0,未递交，1：递交中，2：成功
    resultphone:{ type:  Schema.Types.Number, default: 0 },//运营商认证，-1:失败，0,未递交，1：递交中，2：成功
    resultzhima:{ type:  Schema.Types.Number, default: 0 },//芝麻分，-1:失败，0,未递交，1：递交中，2：成功
    resulttaobao:{ type:  Schema.Types.Number, default: 0 },//淘宝，-1:失败，0,未递交，1：递交中，2：成功
    resultrealname:{ type:  Schema.Types.Number, default: 0 },//实名认证，-1:失败，0,未递交，1：递交中，2：成功
    submit_at: { type: Date, default:new Date()},

    zhimapoint:Number,//芝麻分
    hukou:String,
    limithuabei:Number,//花呗额度
    limitjiebei:Number,//借呗额度
    jiedaibaofuzai:Number,//借贷宝负债
    jiedaobaoyihuan:Number,//借贷宝已还
    realtimeforphoneyear:Number,//手机号实名时间（年）

    hasgudingzichan:{ type: Boolean, default: false },//是否有固定资产
    hasdanwei:{ type: Boolean, default: false },//是否有工作单位
    hasgongjijin:{ type: Boolean, default: false },//是否有公积金
    hasshebao:{ type: Boolean, default: false },//是否有社保
    hassanhaotongyi:{ type: Boolean, default: false },//三号是否统一
    hasjinrihuankuan:{ type: Boolean, default: false },//有无今日还款
    hasyuqijilu:{ type: Boolean, default: false },//有无逾期记录
    hasshenfenzhengyuanjian:{ type: Boolean, default: false },//身份证原件

    weixinopenid:String,
    weixinaccesstoken:String,
    approvalrejectseason:{type:String,default:''},
    approvalstatus:{type:String,default:'未递交'},//未递交/待审核/审核中/已审核/已拒绝

});
UserBorrowerSchema.plugin(mongoosePaginate);
let UserBorrower  = mongoose.model('UserBorrower',  UserBorrowerSchema);

//放款人
let UserLenderSchema = new Schema({
    username:String,
    passwordhash: String,
    passwordsalt: String,
    created_at: { type: Date, default:new Date()},
    updated_at: Date,
    profile:{ type: Schema.Types.Mixed,default:{
        nickname:`放款人${chance.string({length: 4,pool: '0123456789'})}`,
        avatar:'img/myprofile/1.png'},
        sex:'男'
    },
    truename:String,  //真实用户名
    phonenumber:String,//手机号
    urlphoneid1:String,//身份证照片正面
    urlphoneid2:String,//身份证照片反面
    weixinopenid:String,
    weixinaccesstoken:String,
    approvalrejectseason:{type:String,default:''},
    approvalstatus:{type:String,default:'未递交'},//未递交/待审核/审核中/已审核/已拒绝
    canaccept:{ type: Boolean, default: true },//是否允许接单
    canacceptreason:{type:String,default:''},//是否允许接单理由
    lastpayatwithfailed:Date,
});
UserLenderSchema.plugin(mongoosePaginate);
let UserLender  = mongoose.model('UserLender',  UserLenderSchema);

//中介
let UserAgencySchema = new Schema({
    username:String,
    passwordhash: String,
    passwordsalt: String,
    created_at: { type: Date, default:new Date()},
    updated_at: Date,
    profile:{ type: Schema.Types.Mixed,default:{
        nickname:`中介${chance.string({length: 4,pool: '0123456789'})}`,
        avatar:'img/myprofile/1.png'},
        sex:'男'
    },
    invitecode:String,
    balance:{ type: Schema.Types.Number,default: 0 },//用户余额
    weixinopenid:String,
    weixinaccesstoken:String,
    approvalrejectseason:{type:String,default:''},
    approvalstatus:{type:String,default:'未递交'},//未递交/待审核/审核中/已审核/已拒绝

});
UserAgencySchema.plugin(mongoosePaginate);
let UserAgency  = mongoose.model('UserAgency',  UserAgencySchema);

//=====================================================================
UserAdminSchema = new Schema({
  username:String,
  password:String,
  created_at: { type: Date, default:new Date()},
  updated_at: Date,
});
let UserAdmin  = mongoose.model('UserAdmin',  UserAdminSchema);


//订单：用户id,[订单详情id],支付方式,折扣金额,金额,订单状态,送货地址id,是否删除，优惠券抵扣金额，优惠券ID／商品总价
let OrderSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'UserBorrower' },
    userlender:{ type: Schema.Types.ObjectId, ref: 'UserLender' },
    ordertitle:String,  //订单标题（支付宝，微信用）
    orderdetail:String,//订单内容（文字）
    moneylimit:Number,//借款额度
    moneyperiod:Number,//借款周期（天）
    moneyusefor:String,//借款用途
    moneylender:Number,//放款额度
    feeservice:Number,//服务费
    depositratio:Number,//押金比
    moneyreal:Number,//实付价
    realprice:Number,//实际支付给平台的价格
    orderstatus:{ type: Number, default:0},//0:借款中,1:（待确认／已接单）,2:（放款中／已确认）,3:放款成功！(待支付)／4:订单完成/-1:异常订单，-2：放款失败
    statusforborrower:String,//借款中/待确认/放款中/放款成功/订单完成
    statusforlender:String,//借款中／已接单/已确认/放款成功/订单完成
    paystatus:{ type: String, default:'未支付'},//已支付、未支付
    created_at: { type: Date, default:new Date()},
    useragree_at: { type: Date, default:new Date()},
    errorreason:String,//异常信息
    matched_at:Date,
    pay_at:Date,
});
OrderSchema.plugin(mongoosePaginate);
let Order  = mongoose.model('Order',  OrderSchema);


//充值记录（提现记录）
let RechargerecordSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'UserAgency' },
    fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
    fromwithdrawcashapply:{ type: Schema.Types.ObjectId, ref: 'Withdrawcashapply' },
    fromuser:{ type: Schema.Types.ObjectId, ref: 'UserBorrower' },
    feeold:Number,//旧余额
    feenew:Number, //新余额
    feebonus:Number,//奖励金额
    orderprice:Number,//订单金额
    srctype:String,//‘order'来自订单,'withdrawcash'来自提现
    created_at: { type: Date, default:new Date()},
});
RechargerecordSchema.plugin(mongoosePaginate);
let Rechargerecord  = mongoose.model('Rechargerecord',  RechargerecordSchema);

//提现申请
let WithdrawcashapplySchema =  new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    truename:String,//真实姓名
    bankaccount:String,//银行账号
    bankname:String,//银行名称
    cashmoney:Number,//提现金额
    status:String,//未验证／已验证／已支付
    created_at:  { type: Date, default:new Date()},
});
WithdrawcashapplySchema.plugin(mongoosePaginate);
let Withdrawcashapply  = mongoose.model('withdrawcashapply',  WithdrawcashapplySchema);


let AboutSchema = new Schema({
    keyname:String,
    title:String,
    desc:String,
  });
AboutSchema.plugin(mongoosePaginate);
let About  = mongoose.model('About',  AboutSchema);


let CancelOrderRecordSchema = new Schema({
    created_at: { type: Date, default:new Date()},
    creator:{ type: Schema.Types.ObjectId, ref: 'UserBorrower' },
    order:{ type: Schema.Types.ObjectId, ref: 'Order' },
});
CancelOrderRecordSchema.plugin(mongoosePaginate);
let CancelOrderRecord  = mongoose.model('CancelOrderRecord',  CancelOrderRecordSchema);

//用户余额表
// let UserbalanceSchema= new Schema({
//     creator:{ type: Schema.Types.ObjectId, ref: 'User' },
//     balance:Number,//余额
// });
// UserbalanceSchema.plugin(mongoosePaginate);
// let Userbalance  = mongoose.model('Userbalance',  UserbalanceSchema);
exports.SystemConfigSchema = SystemConfigSchema;
exports.UserBorrowerSchema = UserBorrowerSchema;
exports.UserLenderSchema= UserLenderSchema;
exports.UserAgencySchema= UserAgencySchema;
exports.UserAdminSchema= UserAdminSchema;
exports.OrderSchema= OrderSchema;
exports.RechargerecordSchema= RechargerecordSchema;
exports.WithdrawcashapplySchema= WithdrawcashapplySchema;
exports.AboutSchema = AboutSchema;
exports.CancelOrderRecordSchema = CancelOrderRecordSchema;



exports.SystemConfigModel = SystemConfig;
exports.UserBorrowerModel = UserBorrower;
exports.UserLenderModel= UserLender;
exports.UserAgencyModel= UserAgency;
exports.UserAdminModel= UserAdmin;
exports.OrderModel= Order;
exports.RechargerecordModel= Rechargerecord;
exports.WithdrawcashapplyModel= Withdrawcashapply;
exports.AboutModel = About;
exports.CancelOrderRecordModel = CancelOrderRecord;
