import _ from 'lodash';
import data from './datahandler.js';
const handlerlist = {};

const recvmessagetoresultpair = data.recvmessagetoresultpair;

export function wsrecvhandler(socket,emit){

  _.map(recvmessagetoresultpair,(fnresult,keyname)=>{
    handlerlist[keyname] = (socket, emit)=> {
      return ((result)=> {
        emit(fnresult(result));
      });
    }
  })
  
  _.map(handlerlist,(handlersocket,handlername)=>{
    socket.on(handlername,handlersocket(socket,emit));
  });

}
