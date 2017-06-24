import React from 'react';
//import { Field } from 'redux-form';
import { Field } from 'redux-form/lib/Field';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
//import 'antd/dist/antd.css';
import './imageupload.css';
import config from '../../env/config.js';
import PicaDisposePhoto from '../../util/pica_dispose_photo';

const renderImageupload= (props) => {

    let {input,loading,width,height,maxWidthOrHeight} = props;
    let usertype = localStorage.getItem("usertype");
    let usertoken = localStorage.getItem(`${usertype}_user_token`);
    let beforeUpload =(v)=> {
      let imgInfo = {};
      let restconfig = {
        width:width || -1,
        height:height || -1,
        maxWidthOrHeight:maxWidthOrHeight||800
      };
      return new Promise((resolve) => {
        const picaphoto = new PicaDisposePhoto(restconfig);
        picaphoto.disposePhotoWithFile(v,imgInfo).then((file)=>{
          file.uid = v.uid;
          resolve(file);
        });
      });
    }

    let handleChange = (info) => {
        loading(true);
        if (info.file.status !== 'uploading') {
            loading(false);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          if(info.file.response.files.length > 0){
            //"url": "http://localhost:3004/uploader/IMG_3047.JPG",
            input.onChange(info.file.response.files[0].url);
          }

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }

    }
  let imageUrl = input.value;
  const {label} = props;
  return (
    <Upload
       className="avatar-uploader"
       name="file"
       showUploadList={false}
       action= {config.serverurl + "/uploadavatar"}
       headers={{
          'Authorization':'Bearer '+usertoken
       }}
       beforeUpload={beforeUpload}
       onChange={handleChange}
     >
       {
         imageUrl ?
           <img src={imageUrl} alt="" className="avatar" /> :
           <Icon type="plus" className="avatar-uploader-trigger" />
       }
     </Upload>
   );

}


export  {renderImageupload};
