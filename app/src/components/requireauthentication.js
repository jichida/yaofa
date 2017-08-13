import React from 'react';
import {connect} from 'react-redux';
import Redirect from 'react-router-dom/Redirect';

export function requireAuthentication(Component) {

    let AuthenticatedComponent = (props)=>{
      let loginroute = '';
      if(!props.loginsuccess){
        let redirectAfterLogin = props.location.pathname;
        loginroute = '/login?next=' + redirectAfterLogin;
      }
      if(props.loginsuccess === true){
        return (<Component {...props}/>)
      }else{
        return (<Redirect to={loginroute}/>)
      }

    };

    const mapStateToProps =  ({userlogin:{loginsuccess}}) =>{
      return {loginsuccess};
    };

    return connect(mapStateToProps)(AuthenticatedComponent);

}
