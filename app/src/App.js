import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import Login from "./components/login";
import Register from "./components/register";
import AddBorrow from "./components/user/addborrow";
import Loaninfo from "./components/user/loaninfo";
//loaninfo

class App extends Component {
    render() {
        let indexbanner = ["img/5.png"];
        return (
            <div className="AppContainer">
                <Loaninfo />

            </div>
        );
    }
}

export default App;
