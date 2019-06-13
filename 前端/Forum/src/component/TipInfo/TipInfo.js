import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import './TipInfo.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Icon} from 'antd';
import Nav from "../Home/Nav";
import Msg from '../Msg/Msg'

class TipInfo extends React.Component{
    constructor (prop){
        super(prop);
        if(sessionStorage.getItem("userInfo")!==null){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            if(sessionStorage.getItem("targetTip")!==null){
                let targerTip = JSON.parse(sessionStorage.getItem("targetTip"));
                this.state={
                    width: window.screen.width,
                    Usr:{},
                    account:userInfo.account,
                    isLogin:1,
                    targetAccount:targerTip.targetAccount,
                    targetPostID:targerTip.targetPostID,
                    // targetAccount:"13989605539",
                    // targetPostID:"3",
                    ReplyList:[],
                    Like:"",
                    isShow:false,
                    imgpath:userInfo.imgpath,
                    userName:userInfo.userName,
                    Page:0,
                    typeImg:"",
                }
        }
        else{
            this.state={
                isLogin:0,
            }
        }
        }
        else{
            this.state={
                isLogin:0,
            }
        }
    }

    componentWillMount() {
        let that=this;
        let data = {
            account:that.state.targetAccount,
            postID:parseInt(that.state.targetPostID),
        }
        axios({
            method: 'POST',
            url: 'http://120.79.15.252/Forum/AddVisit',
            data:JSON.stringify(data)
        })
        axios({
            method: 'POST',
            url: 'http://120.79.15.252/Forum/GetPost',
            data:JSON.stringify(data)
        }).then(function(res){
            let usr
            usr = res.data;

            that.setState({
                Usr:usr,
                Like:usr.dlike,
            })
            if (usr.topic==='java') {
                that.setState({
                    typeImg:require("../../assets/header/java-icon.jpg"),
                })
            }
            else if(usr.topic==='react'){
                that.setState({
                    typeImg:require("../../assets/header/react-icon.jpg"),
                })
            }
            else if(usr.topic==='python'){
                that.setState({
                    typeImg:require("../../assets/header/python-icon.jpg"),
                })
            }
            else if(usr.topic==='vue'){
                that.setState({
                    typeImg:require("../../assets/header/vue-icon.jpg"),
                })
            }
        })
        this.getReplyList();
        
    }
    doComment = (e) =>{
        e.preventDefault();
        let a = e.currentTarget['context'];
        let context = e.currentTarget['context'].value
        let that = this;
        let Time = new Date();
        
        if(context===''){
            Msg("请输入内容")
        }
        else{
            
            let month = Time.getMonth();
            month = month+1;
            let date = Time.getDate();
            if(month<9){
                month = '0'+month;
            }
            if(date<9){
                date = '0'+date;
            }
            let time = Time.getFullYear()+'-'+month+'-'+date+' ';
            let hour = Time.getHours();
            let minute = Time.getMinutes();
            let second = Time.getSeconds();
            if(hour<9){
                hour = '0'+hour;
            }
            if(minute<9){
                minute = '0'+minute;
            }
            if(second<9){
                second = '0'+second;
            }
            time =time+hour+':'+minute+':'+second;
            let data = {
                context:context,
                owner:that.state.account,
                time:time,
                account:that.state.targetAccount,
                postID:that.state.targetPostID,
            }
            
            axios({
                method: 'POST',
                url: 'http://120.79.15.252/Forum/Reply',
                data: JSON.stringify(data),
            }).then(function(res){
                if(res.data==1){
                    Msg("发表成功");
                    a.value = "";
                    that.getReplyList();
                }
            })
            
        }
    }

        getReplyList = () =>{
            let that=this;
            let account = this.state.targetAccount;
            let postID = this.state.targetPostID;
            let data = {
                account:account,
                postID:postID,
            };
            axios({
                method:'POST',
                url: 'http://120.79.15.252/Forum/GetReplyList',
                data: JSON.stringify(data),
            }).then(function(res){
               that.setState({
                ReplyList:res.data,
               }
                    
               )
            })
        }
        getaddlike =() =>{
            let that=this;
            let data = {
            account:that.state.targetAccount,
            postID:parseInt(that.state.targetPostID)    
            }
            axios({
                method: 'POST',
                url: 'http://120.79.15.252/Forum/AddLike',
                data:JSON.stringify(data)
            }).then(function(res){
                let like
               
                like = res.data;
                that.setState({
                    Like:like,
                })
            })
        }

        toOtherHome = (e) =>{
            let that = this;
            this.setState({
                Page:9,
              }
            )
            let otherUser = {
                account:e.currentTarget.getAttribute('account'),
                userName:e.currentTarget.getAttribute('userName'),
                imgpath:e.currentTarget.getAttribute('imgpath'),
            }
            sessionStorage.setItem("otherUser",JSON.stringify(otherUser));
        
          }

    render(){
        let isLogin = this.state.isLogin;
        let Page = this.state.Page;
        if(isLogin===0) return <Redirect to='/' />;
        if (Page ===9 ) return <Redirect to={{
            pathname:'/NewPersonHome',
          }} />;
        console.log(this.state.typeImg)
        return(
            <div>
                <Nav userName={this.state.userName} imgpath={this.state.imgpath} account={this.state.account} isShow={this.state.isShow}/>
                <div className="TipInfo-body" style={{width:this.state.width*0.6,margin:"0 auto",marginTop:150}}>
                <div className="TipInfo-header">
                    <div className="TipInfo-portrait">
                        <img src={this.state.typeImg} />
                    </div>

                    <div className="TipInfo-Account">
                        <span>{this.state.Usr.title}</span>
                        <a>+关注</a>
                        
                    </div>
                    <div className='TipInfo-addlike'>
                       
                    </div>

                    <div className="TipInfo-Title">
                        <span id="TipInfp-Content">帖主：{this.state.Usr.userName}</span>
                        <span id="TipInfp-Topic">主题：{this.state.Usr.topic}</span> 
                        <span id="TipInfp-Visit">浏览量：{this.state.Usr.visit}</span> 
                        <a onClick={this.getaddlike}>
                            <Icon type="like" />
                            {this.state.Like}
                        </a>
                    </div>
                </div>
                

                <div className="TipInfo-Content">
                    <section className="TipInfo-comment">
                        <div className="TipInfo-Userportrait">
                            <div>
                                <span style={{padding:"4px",background:"orange",borderRadius:"4px"}}> 楼主</span>
                            </div>
                            <img src={this.state.Usr.imgpath} account={this.state.targetAccount} userName={this.state.Usr.userName} imgpath={this.state.Usr.imgpath} onClick={this.toOtherHome}/>
                        </div>
                        <div className="TipInfo-Username">
                            <span >{this.state.Usr.userName}</span>
                        </div>
                            
                        <div className="TipInfo-Usercomment">
                            <span>{this.state.Usr.context}</span>
                        </div>
                        <div className="TipInfo-Time">
                            <a >{this.state.Usr.time}</a>
                        </div>
                    </section> 
                </div>

                {
                    this.state.ReplyList.map((element)=>
                        <div className="TipInfo-Content">
                            <section className="TipInfo-comment">
                                <div className="TipInfo-Userportrait">
                                    <div>
                                        <span style={{padding:"4px",background:"skyblue",borderRadius:"4px"}}> {element.replyID+1}楼</span>
                                    </div>
                                    <img src={element.imgpath} account={element.owner} userName={element.userName} imgpath={element.imgpath} onClick={this.toOtherHome} />
                                   
                                </div>
                                <div className="TipInfo-Username">
                                    <span>{element.userName}</span>
                                </div>
                                
                                <div className="TipInfo-Usercomment">   
                                    <span>{element.context}</span>
                                </div>
                                <div className="TipInfo-Time">
                                    <a >{element.time}</a>
                                </div>
                            </section> 
                        </div>
                    )
                }

                <div className="TipInfo-doComment">
                    <form onSubmit={this.doComment}>
                        <div style={{marginLeft:"4%"}}>
                            <span>发表评论</span>
                        </div>
                        <textarea className='TipInfo-context' rows='5' placeholder='内容不超过150字' name='context' />
                        <div style={{marginLeft:"90%",marginTop:"3%"}} >
                            <button type='submit'>发表</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default TipInfo;