/*
    照片认证
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../../public/css/validation-photo.css';

class Page extends Component {

    render() {

        return (
            <div className="validationPhotoPage AppPage">
                <DocumentTitle title="身份信息" />
                <div className="validationPhotoTitle">
                    请拍摄实时照片
                </div>
                <div className="list">
                    <div className="li">
                        <img src="img/11.png" />
                        <div>
                            <span className="tit">请上传身份证正面</span>
                            <span className="lnk blue">查看样例</span>
                        </div>
                    </div>
                    <div className="li">
                        <img src="img/11.png" />
                        <div>
                            <span className="tit">请上传身份证反面</span>
                            <span className="lnk blue">查看样例</span>
                        </div>
                    </div>
                    <div className="li">
                        <img src="img/11.png" />
                        <div>
                            <span className="tit">手持身份证照片</span>
                            <span className="lnk blue">查看样例</span>
                        </div>
                    </div>
                </div>
                <div className="btn Primary">
                    确认 ｜ 完成认证
                </div>
            </div>
        )
    }
}

export default Page;