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
    },
    userlender:{
      name: '放款人列表 |||| 放款人列表',
    },
    userborrow:{
      name: '借款人列表 |||| 借款人列表',
    },
    withdrawcash:{
      name: '提现管理 |||| 提现管理',
    },
    order:{
      name: '订单管理 |||| 订单管理',
      fields:{
        orderstatus:'订单状态',
        paystatus:'支付状态',
        creator:'关联用户',
        expressid:'选择快递公司(仅设为可见的快递公司才会列出)',
        expresscode:'快递公司编码',
        orderprice:'商品总额',
        realprice:'实付价',
        couponprice:'优惠价抵扣',
        pointprice:'积分抵扣',
        productname:'产品名',
        productnumber:'购买数量',
        productprice:'产品单价',
        producttotalprice:'产品总价'
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
