/**
 * Created by wangxiaoqing on 2017/3/26.
 */
import {requestpostdatawithtoken} from '../util/util.js';
import PicaDisposePhoto from './pica_dispose_photo';

export function fileupload(e,config,callbackfn){
    const {usertoken,...restconfig} = config;
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
        files = e.dataTransfer.files;
    } else if (e.target) {
        files = e.target.files;
    }
    let v = files[0];
    let imgInfo = {};
    const picaphoto = new PicaDisposePhoto(restconfig);
    picaphoto.disposePhotoWithFile(v,imgInfo).then((blob)=>{
      console.log('onChange call setimage:' + v.filename);
      const data = new FormData();
      data.append('usertype','rider');
      data.append('filename', v.name );
      data.append('file', blob);
      requestpostdatawithtoken('/upload',usertoken,data,(issuc,result)=>{
          console.log("issuc:" + issuc);
          console.log("result:" + JSON.stringify(result));
          callbackfn(issuc,result);
      });
    });
}
