import React from 'react';
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import './Post.css';
import 'axios';
import axios from 'axios';
import Nav from "../Home/Nav";
import Msg from '../Msg/Msg'

class Post extends React.Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem("userInfo")!==null){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            this.state={
                userName:userInfo.userName,
                account:userInfo.account,
                imgpath:userInfo.imgpath,
                width:window.screen.width,
                opDis:'block',
                topic: '',
                Page:5,
                isLogin:1,
            }
        }
        else{
            this.state={
                isLogin:0,
            }
        }
    }

    hiddenOp = () =>{
        this.setState({
            opDis:'none',
        })
    }

    doPost = (e) =>{
        e.preventDefault();
        let title = e.currentTarget['title'].value;
        let context = e.currentTarget['context'].value
        let topic = this.state.topic;
        let that = this;
        let Time = new Date();
        
        if(title===''||context===''||topic===''){
            Msg("请填写完整内容")
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
                title:title,
                context:context,
                topic:topic,
                account:that.state.account,
                time:time,
                isShow:false,
            }
            
            axios({
                method: 'POST',
                url: 'http://120.79.15.252/Forum/Post',
                data: JSON.stringify(data),
            }).then(function(res){
                if(res.data==1){
                    Msg("发帖成功")
                    that.setState({
                        Page:1,
                    })
                    console.log(that.state.Page);
                }
            })
            
        }
    }

    ChangeTopic = (e) =>{
        this.setState({
            topic:e.currentTarget.value
        })
    }

    toHome = () =>{
        this.setState({
            Page:1,
        })
    }

    render(){
        let Page = this.state.Page;
        let isLogin = this.state.isLogin;
        if(isLogin===0) return <Redirect to='/'/>;
        if(Page===1) return <Redirect to='/Home'  />;
        return(
            <div>
                <Nav userName={this.state.userName} imgpath={this.state.imgpath} account={this.state.account} isShow={this.state.isShow}/>
                <div className="P-body" >
                <div className='postBody'>
                    <div style={{width:this.state.width*0.5,height:this.state.width*0.45}} className='postMain'>
                        <div className='head'>
                            <span>发布新帖</span>
                        </div>
                        <div className='body'>
                            <form onSubmit={this.doPost}>
                                <input className='title' placeholder='请填写标题' name='title'/>
                                <textarea className='context' rows='15' placeholder='内容不超过140字' name='context' />
                                <div className='select'>
                                    <span>选择帖子所属专题:</span>
                                    <select  onFocus={this.hiddenOp} onChange={this.ChangeTopic} name='select'>
                                        <option value ="" style={{display:this.state.opDis}}></option>
                                        <option value ="react">React</option>
                                        <option value ="java">Java</option>
                                        <option value="vue">Vue</option>
                                        <option value="c">C语言</option>
                                        <option value="c++">C++</option>
                                        <option value="c#">C#</option>
                                        <option value="python">python</option>
                                        <option value="other">其他</option>
                                    </select>
                                </div>
                                <div className='button'>
                                    <button className='back' onClick={this.toHome}>返回主页</button>
                                    <button className='submit' type='submit'>确认发布</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default Post;