import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import "./TipList.css";
import 'antd/dist/antd.css'
import { Icon} from 'antd';
import axios from 'axios';
import Nav from '../Home/Nav'

class TipList extends Component{
    constructor(props){
        super(props)
        if(sessionStorage.getItem("userInfo")!==null){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            this.state={
                account:userInfo.account,
                userName:userInfo.userName,
                imgpath:userInfo.imgpath,
                isLogin:1,
                width:window.screen.width,
                Tiplist:[],
                isShow:true,
                Page:0,
                ReactList:[],
            }
        }
        else{
            this.state={
                isLogin:0,
            }
        }
        
    }
    componentWillMount() {
        let that=this
        axios({
            method: 'POST',
            url: 'http://120.79.15.252/Forum/GetPostList',
        }).then(function(res){
            let tiplist
            tiplist = res.data;
            that.setState({
                Tiplist:tiplist,
            })
        })
        
    }
    toTipInfo =(e)=>{
        console.log();
        this.setState({
            Page:8,
            }
        )
        let targetTip = {
            targetAccount:e.currentTarget.getAttribute('account'),
            targetPostID:e.currentTarget.getAttribute('postID'),
        }
        sessionStorage.setItem("targetTip",JSON.stringify(targetTip));
    }
    render(){
        let type = sessionStorage.getItem('itemType')

        this.state.Tiplist.map(item => {
            if (item.topic === type){
                this.state.ReactList.push(item)
            }
        })
        let Page = this.state.Page;
        if (Page ===8 ) return <Redirect to={{
            pathname:'/TipInfo',
        }} />
        return(
            <div >
                <Nav userName={this.state.userName} imgpath={this.state.imgpath} account={this.state.account} isShow={this.state.isShow}/>

                <div className="TipList-wrapper" style={{width:this.state.width*0.8}} >
                    <div className="Tiplist-topic">
                        <span>{type}</span>
                    </div>
                    {
                        this.state.ReactList.map((element)=>
                        <section className="TipList-tip" onClick={this.toTipInfo} postID={element.postID} account={element.account}>
                            <div className="Tiplist-title">
                                <span >{element.title}</span>
                            </div>
                            <div className="Tiplist-context">
                                <span >{element.context}</span>
                            </div>
                            <div className="TipList-portrait">
                                <img src={element.imgpath}/>
                                <span className="Tiplist-name" >{element.userName}</span>
                                <span className="Tiplist-time">{element.time}</span>
                            </div>
                            {/*<div className="Tiplist-nickname">*/}
                                {/*<span className="Tiplist-data" >{element.userName}</span>*/}
                            {/*</div>*/}
                            {/*<div className="Tiplist-tiptime">*/}
                                {/*<span>{element.time}</span>*/}
                            {/*</div>*/}
                            <div className="Tiplist-share">
                                <Icon type="share-alt"/>
                                <span>分享</span>
                                <Icon type="message" />
                                <span>评论{element.replyNum}</span>
                            </div>
                            <div className="Tiplist-dolike">
                                <Icon type="eye" title='浏览量'/>
                                <span>{element.visit}</span>
                                <Icon type="like" title='点赞量'/>
                                <span>{element.dlike}</span>
                            </div>
                        </section>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default TipList;