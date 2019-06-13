import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";

import "./Nav.css"
import { Input, Icon } from 'antd';
import 'antd/dist/antd.css'
const Search = Input.Search;


class Nav extends Component{
    constructor(props) {
        super(props);
        this.state={
            Page:1,
            userName:this.props.userName,
            imgpath:this.props.imgpath,
            isShow:this.props.isShow,
            modalIsOpen:'none',
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.userCenter = this.userCenter.bind(this);
        this.handleMouseUserOver = this.handleMouseUserOver.bind(this);
    }
    personPage =(e)=>{
        this.setState({
            Page:3
        })
    }
    toPost = () =>{
        this.setState({
            Page:5,
        })
    }
    toCenter = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            Page:11,
        })
    }
    preventPop = (e) =>{
        e.stopPropagation();
    }
    toHome = (e) =>{
        e.preventDefault();
        this.setState({
            Page:99,
        })
    }
    quit = (e) =>{
        e.stopPropagation();
        sessionStorage.clear();
        this.setState({
            Page:100,
        })
    }
    handleMouseOver(e){
        this.setState({
            modalIsOpen: 'block',
        })
    }

    handleMouseOut(){

        this.setState({
            modalIsOpen: 'none',
        })

    }
    handleMouseUserOver(e){
        this.setState({
            modalIsOpen: 'block',
        })
    }

    userCenter(){
        this.setState({
            modalIsOpen: 'none',
        })
    }

    render() {
        let Page = this.state.Page
        if ( Page === 3 )
            return <Redirect to="/PersonHome" />
        else if(Page === 5)
            return <Redirect to="/Post" />
        else if(Page === 11)
            return <Redirect to="/PersonCenter"/>
        else if(Page === 99)
            return <Redirect to="/Home"/>
        else if(Page === 100)
            return <Redirect to="/"/>
        return(
            
            <div className="H-Nav">
                <div className="navbar" style={{background:this.state.isShow===true?'hsla(0,0%,100%,.4)':'#fafafa'}}>
                    <div className="navbar-wrap">
                        <Link to= "/Home"><div className="navbar-left">首 页</div></Link>
                        <div className="navbar-right">
                            <ul>
                                <Link to= "/Post"><li className="add" >发 帖</li></Link>
                                <li  className={"avatar-li"}>
                                    <Link to= "/PersonHome">
                                    <div className="avatar"
                                         style={{background: 'url('+this.state.imgpath+')',backgroundSize:'100%'}}
                                         // onClick={this.preventPop.bind(this)}
                                         onMouseOver={this.handleMouseOver}
                                         onMouseLeave={this.handleMouseOut}
                                    >
                                    </div>
                                    </Link>
                                    <div className="pop-info"
                                         onClick={this.preventPop.bind(this)}
                                         style={{display:this.state.modalIsOpen}}
                                         onMouseOver={this.handleMouseUserOver}
                                         onMouseLeave={this.handleMouseOut}
                                    >
                                        <h2>{this.state.userName}</h2>
                                        <Link id={"center"} to="/PersonCenter">
                                            <Icon type="user"/>个人中心
                                        </Link>
                                        <div className="pop-info-quit">
                                            <a id={"pop-quiz"} onClick={this.quit.bind(this)}>退出</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="background-bar" style={{display:this.state.isShow===true?'block':'none'}}>
                    {/*<Search className="search" placeholder="请搜索...." onSearch={value => console.log(value)} enterButton />*/}
                </div>
            </div>
        )
    }
}

export default Nav