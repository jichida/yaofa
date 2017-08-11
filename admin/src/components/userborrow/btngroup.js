import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import config from '../../env/config';
class BtnGroup extends Component {
    componentDidMount() {
      const {record} = this.props;
  //  {"username":"15961125167","weixinopenid":"ojd0T1A4zfuE4vRIbi_YAqBk76nA",
  // "useragencyfrom":"594cdc4a21473a02b0d0947e",
  // "passwordhash":"8c557e2e302a539469fcd6dbb1c99b40044a0893cd71d620115ad4589a75f51fd774ef00a13573f96ec6bcb7c269a66ca1294d0d0ada092f4df2c1318630b91b",
  // "passwordsalt":"52693e7c-febc-4f3b-a3ef-a0b0700bd90c",
  // "updated_at":"2017-08-10T09:04:02.284Z","__v":0,
  // "weixinaccesstoken":"bYfk1JHuTjyL4laKBSYN3MUvnZ22EwnRZcsUw_UxL_d2T7-O8r4ww5Al8KM5UJGB5-mFPElAWjPE3G4u5qvS_5M8L3AgU9PwCEC8ov-tt4E",
  // "resultphone_obj":"认证成功,token:d0112326-7daa-11e7-b910-00163e0372c4",
  // "resultphone_detail_excel":"/uploader/phone_598c0177843df70276fa881d.xlsx",
  // "resultphone_detail":"/uploader/phone_598c0177843df70276fa881d.txt",
  // "contact2":0,"contact1":0,"approvalstatus":"已审核","approvalrejectseason":"",
  // "hasshenfenzhengyuanjian":false,
  // "hasyuqijilu":false,"hasjinrihuankuan":false,
  // "hassanhaotongyi":false,
  // "hasshebao":false,"hasgongjijin":false,"hasdanwei":false,
  // "hasgudingzichan":false,"submit_at":"2017-08-10T09:03:07.233Z",
  // "resultrealname":0,"resulttaobao":0,"resultzhima":0,
  // "resultphone":2,"resultphoto":0,"resultid":0,
  // "profile":{"nickname":"借款人3404","avatar":"img/myprofile/1.png"},
  // "created_at":"2017-08-10T06:47:19.861Z","id":"598c0177843df70276fa881d"}
      console.log(`${JSON.stringify(record)}`);
    }
    onClickGet =()=>{

    }
    render() {
        const date = new Date();
        const timestamp = date.getTime();
        const {record} = this.props;
        let showresult = false;
        let showgettxt = false;
        let showgetexcel = false;
        let hrefresulttxt = ``;
        let hrefresultexcel = ``;
        let hrefresultgettxt = ``;
        let hrefresultgetexcel = ``;

        if(!!record){
          const {id,resultphone,resultphone_obj,resultphone_detail,resultphone_detail_excel}=record;
          if(resultphone === 2){
            showresult = true;
            showgettxt = true;
            showgetexcel = true;
            hrefresulttxt = `${config.serverurl}${resultphone_detail}`;
            hrefresultexcel = `${config.serverurl}${resultphone_detail_excel}`;
            let tokensz = resultphone_obj.split(':');
            if(tokensz.length > 0){
              let token = tokensz[tokensz.length - 1];
              hrefresultgettxt = `${config.serverurl}/authenticationdo/phone/${id}/${timestamp}?token=${token}&status=1`;
            }
          }
        }
        console.log(`
          hrefresulttxt:${hrefresulttxt},
          hrefresultexcel:${hrefresultexcel},
          hrefresultgettxt:${hrefresultgettxt}
          `);

        return (
            <Paper zDepth={2}>
              {
                showresult && (
                  <FlatButton
                    href={hrefresulttxt}
                    primary
                    label={`查看文本结果`}
                    icon={<ImageEye />}
                    style={{ overflow: 'inherit' }}
                  />
                )
              }
              {
                showresult && (
                  <FlatButton
                    href={hrefresultexcel}
                    primary
                    label={`查看excel结果`}
                    icon={<ImageEye />}
                    style={{ overflow: 'inherit' }}
                  />
                )
              }
              {
                showgettxt && (
                  <FlatButton
                    href={hrefresultgettxt}
                    primary
                    label={`重新获取文本结果`}
                    icon={<ImageEye />}
                    style={{ overflow: 'inherit' }}
                  />
                )
              }
            </Paper>
        );
    }
}

BtnGroup.propTypes = {
    record: PropTypes.object,
};

export default connect(null, {
})(BtnGroup);
