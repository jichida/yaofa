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
    picaphoto.disposePhotoWithFile(v,imgInfo).then((file)=>{
      console.log('onChange call setimage:' + file.filename);
      const reader = new FileReader();
      reader.onload = () => {
          const bin = atob(reader.result.replace(/^.*,/, ''));
          const buffer = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) {
              buffer[i] = bin.charCodeAt(i);
          }
          const image = new Blob([buffer.buffer], {
              type: 'image/png',
          });

          const data = new FormData();
          data.append('usertype','rider');
          data.append('filename', file.name );
          data.append('file', image);
          requestpostdatawithtoken('/upload',usertoken,data,(issuc,result)=>{
              console.log("issuc:" + issuc);
              console.log("result:" + JSON.stringify(result));
              callbackfn(issuc,result);
          });
      };
      reader.readAsDataURL(file);
    });
}
