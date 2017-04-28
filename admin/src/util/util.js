import request from 'request';
import config from '../env/config.js';
import querystring from 'querystring';
import axios from 'axios';
const api = axios.create({
  baseURL: config.serverurl,
});

export const requestget = (uri,param,callback)=>{
  let baseUrl = config.serverurl + uri;
  request.get(baseUrl+querystring.stringify(param),(error, response, body)=> {
    if(error){
      console.log("requestget error:" + JSON.stringify(error));
      callback(false,error.message);
      return;
    }
    if(response.statusCode === 200){
      let retresult = JSON.parse(body);
      if(retresult.result === 'OK'){
        callback(true,retresult.data);
      }
      else{
        callback(false,retresult.message);
      }
    }
    else if(response.statusCode === 401){
      callback(false,'用户未登录');
    }
    else{
      callback(false,'服务器内部错误');
    }
  });
}

export const requestpost = (uri,param,callback)=>{
  let baseUrl = config.serverurl + uri;
  console.log("requestpost uri:" + uri);
  console.log("requestpost token:" + JSON.stringify(param));

  request.post(baseUrl,{json:param},(error, response, body)=> {
    if(error){
      console.log("requestpost error:" + JSON.stringify(error));
      callback(false,error.message);
      return;
    }
    if(response.statusCode === 200){
      let retresult = body;
      if(retresult.result === 'OK'){
        callback(true,retresult.data);
      }
      else{
        callback(false,retresult.message);
      }
    }
    else if(response.statusCode === 401){
      callback(false,'用户未登录');
    }
    else{
      callback(false,'服务器内部错误');
    }
  });
}

export const requestgetwithtoken = (uri,token,callback)=>{
  console.log("requestgetwithtoken uri:" + uri);
  console.log("requestgetwithtoken token:" + token);

  let baseUrl = config.serverurl + uri;
  request.get(baseUrl,{
              credentials: 'include',
              headers: {
                  'Authorization':'Bearer '+token,
              }
          },(error, response, body)=> {
            if(error){
              console.log("requestgetwithtoken error:" + JSON.stringify(error));
              callback(false,error.message);
              return;
            }
    if(response.statusCode === 200){
      let retresult = JSON.parse(body);
      if(retresult.result === 'OK'){
        callback(true,retresult.data);
      }
      else{
        callback(false,retresult.message);
      }
    }
    else if(response.statusCode === 401){
      callback(false,'用户未登录');
    }
    else{
      callback(false,'服务器内部错误');
    }
  });
}

export const apipost = (uri,data)=>{
  let baseUrl = config.restserverurl + uri;
  return api.post(baseUrl, data);
};

export const requestpostdatawithtoken = (uri,token,data,callback)=>{
   api.post(uri, data,{
                headers: {
                     'Authorization': 'Bearer '+token,
                 }
               }).then(response => {
                 console.log('response:' + JSON.stringify(response));
                 if(response.status === 200){
                   let retresult = response.data;
                   if(retresult.result === 'OK'){
                     callback(true,retresult.data);
                   }
                   else{
                     callback(false,retresult.message);
                   }
                 }
                 else if(response.status === 401){
                   callback(false,'用户未登录');
                 }
                 else{
                   callback(false,'服务器内部错误');
                 }
    }).catch(() => {
        callback(false,'服务器错误');
    });
};

export const requestpostwithtoken = (uri,token,data,callback)=>{
  let baseUrl = config.serverurl + uri;
  request.post(baseUrl,{
              credentials: 'include',
              headers: {
                  'Authorization': 'Bearer '+token,
              },
              json:data
          },(error, response, body)=> {
            if(error){
              console.log("requestpostwithtoken error:" + JSON.stringify(error));
              callback(false,error.message);
              return;
            }
    if(response.statusCode === 200){
      let retresult = body;
      if(retresult.result === 'OK'){
        callback(true,retresult.data);
      }
      else{
        callback(false,retresult.message);
      }
    }
    else if(response.statusCode === 401){
      callback(false,'用户未登录');
    }
    else{
      callback(false,'服务器内部错误');
    }
  });
}
