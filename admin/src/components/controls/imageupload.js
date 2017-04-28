import React from 'react';
import { Field } from 'redux-form';
import { Upload, Icon, message } from 'antd';
//import 'antd/dist/antd.css';
import './imageupload.css';
import config from '../../env/config.js';

const renderImageupload= (props) => {
  let {input} = props;
    console.log("input value:" + input.value);
  // if( Object.prototype.toString.call( input.value ) !== 'string' ) {
  //     input.value = '';
  // }

    let usertoken = localStorage.getItem('admintoken');
    let getBase64 = (img, callback)=> {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    let beforeUpload =(file)=> {
      //const isImage = file.type === 'image/jpeg';
      // if (!isJPG) {
      //   message.error('You can only upload JPG file!');
      // }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isLt2M;
    }

    let handleChange = (info) => {
        console.log("handleChange info:" + JSON.stringify(info));
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
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

const ImageInputUpload = ({source,label}) => {
  return(
    <span>
      <Field name={source} component={renderImageupload} label={label} />
    </span>
)
}

ImageInputUpload.defaultProps = {
    addLabel: true,
};
export  {ImageInputUpload};
