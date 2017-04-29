import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export function requireAuthentication(Component) {

    let AuthenticatedComponent = (props)=>{
      let loginroute = '';
      if(!props.loginsuccess){
        let redirectAfterLogin = props.location.pathname;
        loginroute = '/login?next=' + redirectAfterLogin;
      }
      return (
            <div>
                {props.loginsuccess === true
                    ? <Component {...props}/>
                    : <Redirect to={loginroute}/>
                }
            </div>
        );
    };

    const mapStateToProps =  ({userlogin}) =>{
      return userlogin;
    };

    return connect(mapStateToProps)(AuthenticatedComponent);

}
