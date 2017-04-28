import React, { PropTypes } from 'react';
import { translate } from 'admin-on-rest';



import SystemconfigIcon from 'material-ui/svg-icons/action/settings-brightness';//系统设置
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import TopicIcon from 'material-ui/svg-icons/communication/forum';
import TopiccommentIcon from 'material-ui/svg-icons/communication/forum';
import ForumIcon from 'material-ui/svg-icons/communication/forum';
import CategoryIcon from 'material-ui/svg-icons/action/list';
import BannerIcon from 'material-ui/svg-icons/action/view-carousel';
import ExpressIcon from 'material-ui/svg-icons/content/send';
import ProductIcon from 'material-ui/svg-icons/hardware/toys';
//import CouponIcon from 'material-ui/svg-icons/action/card-giftcard';//优惠券信息
import MycouponIcon from 'material-ui/svg-icons/action/card-giftcard';//优惠券信息
import UserIcon from 'material-ui/svg-icons/action/account-circle';//乘客信息

import Icon from 'material-ui/svg-icons/social/person';
const items = [
  { name: 'systemconfig', icon: <SystemconfigIcon /> },
  
  { name: 'order', icon: <UserIcon /> },
  
  { name: 'useragency', icon: <UserIcon /> },
  { name: 'userborrow', icon: <UserIcon /> },
  { name: 'userlender', icon: <UserIcon /> },

  { name: 'about', icon: <MycouponIcon /> },

];

export default items;

// export default [
//   {
//     'name':'baseinfo',
//     'icon': <PlatformbaseinfoIcon />,
//     'children': [
//       { name: 'systemconfig', icon: <SystemconfigIcon /> },
//       { name: 'news', icon: <UserIcon /> },
//       { name: 'banner', icon: <BannerIcon /> },
//       { name: 'category', icon: <CategoryIcon /> },
//       { name: 'product', icon: <Icon /> },
//       { name: 'express', icon: <ExpressIcon /> },
//       { name: 'coupon', icon: <CouponIcon /> },
//       { name: 'about', icon: <AboutIcon /> },
//     ]
//   },
//    {
//     'name':'forum',
//     'icon': <ForumIcon />,
//     'children': [
//       { name: 'topic', icon: <TopicIcon /> },
//       { name: 'comments', icon: <TopiccommentIcon /> },
//     ]
//   },



//     { name: 'notifymessage', icon: <MessageIcon /> },
//     { name: 'feedback', icon: <FeedbackIcon /> },
//     { name: 'order', icon: <UserIcon /> },
//   {
//     'name':'usermgr',
//     'icon': <UsermgrIcon />,
//     'children': [
//       { name: 'user', icon: <UserIcon /> },
//       { name: 'mycoupon', icon: <MycouponIcon /> },
//       { name: 'withdrawcash', icon: <UserIcon /> },
//     ]
//   },

// ];
