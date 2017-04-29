export default {
  pos:{
    configuration: '偏好',
    language:'语言',
    theme: {
        name: '皮肤',
        light: 'Clair',
        dark: 'Obscur',
    },
  },
  resources: {
    about:{
      name: '关于信息设置 |||| 关于信息设置',
      fields:{
        keyname:'设置类型',
      }
    },
    useragency:{
      name: '中介列表 |||| 中介列表',
      notification:{
        approved_success:'审批成功',
        approved_error:'审批失败',
        rejected_success:'拒绝成功',
        rejected_error:'拒绝失败',
      },
      tabs:{
        basicinfo:'基本信息'
      }
    },
    userlender:{
      name: '放款人列表 |||| 放款人列表',
      notification:{
        approved_success:'审批成功',
        approved_error:'审批失败',
        rejected_success:'拒绝成功',
        rejected_error:'拒绝失败',
      },
      tabs:{
        basicinfo:'基本信息',
        realinfo:'实名资料',
      }
    },
    userborrower:{
      name: '借款人列表 |||| 借款人列表',
      notification:{
        approved_success:'审批成功',
        approved_error:'审批失败',
        rejected_success:'拒绝成功',
        rejected_error:'拒绝失败',
      },
      tabs:{
        basicinfo:'基本信息',
        realinfo:'实名资料',
        authresult:'认证结果',
        personalasset:'个人资产'
      }
    },
    withdrawcash:{
      name: '提现管理 |||| 提现管理',
    },
    order:{
      name: '订单管理 |||| 订单管理',
      tabs:{
        orderinfo:'详情',
        borrower:'借款',
        lender:'放款'
      },
      fields:{
        orderstatus:'订单状态',
        paystatus:'支付状态',
        creator:'关联用户',
        userlender:'放款用户',
      }
    },
    systemconfig:{
      name: '系统配置 |||| 系统配置',
      fields:{
        productcategoryid1:'显示在商城首页的套餐(分类）',
        productcategoryid2:'显示在商城首页的商用一体机(分类）',

      }

    },
  }

};
