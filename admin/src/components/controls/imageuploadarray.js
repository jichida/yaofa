import React from 'react';
import { Field } from 'redux-form';
import { Upload, Icon, Modal,message} from 'antd';
import { connect } from 'react-redux';
import './imageuploadarray.css';
import 'antd/dist/antd.css';
import config from '../../env/config.js';


class PicturesWall extends React.Component {
        constructor(props) {
            super(props);
            console.log('PicturesWall===>' + JSON.stringify(props));
            let fileListcur = [];
            for(let i = 0;i < props.input.value.length;i++){
                fileListcur.push(         {
                    name:'filename'+i,
                    uid:i,
                    status: 'done',
                    url: props.input.value[i]
                });
            }
   
            this.state = {
                previewVisible: false,
                previewImage: '',
                fileList: fileListcur,
            };
        }


  handleCancel = () =>{
    this.setState({ previewVisible: false });
  } 

  handlePreview = (file) => {
    let fileobj = file;
    console.log('onClick handlePreview file:' + JSON.stringify(file));
    if (fileobj.status === 'done') {
      let url = '';
      if(fileobj.hasOwnProperty('url')){
        url = fileobj.url;
      }
      else{
        url = fileobj.response.files[0].url;
      }
      fileobj = {
        status: 'done',
        url: url
      };
    }

    console.log('onClick handlePreview fileobj:' + JSON.stringify(fileobj));
    this.setState({
      previewImage: fileobj.url || fileobj.thumbUrl,
      previewVisible: true,
    });
    // this.setState({
    //   previewImage: file.url || file.thumbUrl,
    //   previewVisible: true,
    // });
  }

  handleChange = ({ fileList }) => {
    console.log('fileList' + JSON.stringify(fileList));
    let filelistnew = [];
    let uploadedfiles =[ ];
    fileList.forEach((fileobj)=>{
      if (fileobj.status === 'done') {
        if(fileobj.hasOwnProperty('url')){//已经处理过了!
          uploadedfiles.push(fileobj.url);
          filelistnew.push(fileobj);
        }
        else{
          uploadedfiles.push(fileobj.response.files[0].url);
          filelistnew.push({
            name:fileobj.name,
            uid:fileobj.uid,
            status: 'done',
            url: fileobj.response.files[0].url
          });
        }

      }
      else {
        filelistnew.push(fileobj);
      }

    });

    this.setState({ fileList:filelistnew });

    console.log('uploadedfiles:' + JSON.stringify(uploadedfiles));
    this.props.input.onChange(uploadedfiles);
  }//this.setState({ fileList })

  render() {
    const {label} = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={config.serverurl + "/uploadavatar"}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const ImageInputUploadArray = ({source,label}) => {
  return(
    <span>
      <Field name={source} component={PicturesWall}  label={label}/>
    </span>
)
}

ImageInputUploadArray.defaultProps = {
    addLabel: true,
};

export  {ImageInputUploadArray};