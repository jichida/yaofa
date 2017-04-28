import { createReducer } from 'redux-act';
import { getabouthtml_result } from '../actions';

const initial = {
  about: {
    'helpcenter':{
      title:'帮助中心',
      desc:'帮助中心'
    },
    'aboutus':{
      title:'关于我们',
      desc:'关于我们'
    },
    'servicerule':{
      title:'服务协议',
      desc:'服务协议'
    }
  },
};

const about = createReducer({
  [getabouthtml_result]: (state, {aboutdoc}) => {
    return { ...state,
            [aboutdoc.keyname]:{
              title:aboutdoc.title,
              desc:aboutdoc.desc,
            }
        };
  },
}, initial.about);

export default about;
