import React from 'react'

import Content from './Content'
import Header from './Header'
import Nav from './Nav'
import { Redirect } from "react-router-dom";

class Home extends React.Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem("userInfo")!==null){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            this.state={
                account:userInfo.account,
                userName:userInfo.userName,
                imgpath:userInfo.imgpath,
                isLogin:1,
                isShow:true
            }
        }
        else{
            this.state={
                isLogin:0,
            }
        }
    }

    render(){
        let isLogin = this.state.isLogin;
        if(isLogin===0) return <Redirect to='/'/>
        return(
            <div>
                <Nav userName={this.state.userName} imgpath={this.state.imgpath} account={this.state.account} isShow={this.state.isShow}/>
                <Header userName={this.state.userName} imgpath={this.state.imgpath} account={this.state.account}/>
                <Content userName={this.state.userName} imgpath={this.state.imgpath} account={this.state.account}/>
            </div>
        )
    }
}

export default Home;