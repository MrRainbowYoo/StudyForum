import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import './Header.css';
import 'antd/dist/antd.css';
import {Breadcrumb,Icon} from 'antd';

class Header extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            Page: 1,
            width: window.screen.width,
            length:0,
        };
        this.showsliede();
    }

    showsliede = () =>{
        let that = this;
        if(that.state.length>-500){
            that.setSlide();
            setTimeout(function(){
                that.showsliede(); 
            },2000);
        }
        else{
            that.setState({
                length:0,
            })
            setTimeout(function(){
                that.showsliede();
            },1);
        }
        
    }

    setSlide = () =>{
        let length = this.state.length;
        let i = 0;
        let that = this;
        var flag = false;
        while(i!=100){
            i=i+1;
            that.imgMove(i,length,100);
        }
    }

    imgMove = (i,length,time) =>{
        let that = this;
        setTimeout(function(){
            that.setState({
                length:length-i
            })
        },time);
    }
    toTipList = (type) =>{
        console.log(type)
        sessionStorage.setItem('itemType',type)
        this.setState({
            Page:6,
        })
    }


    render(){
        let Page = this.state.Page
        if (Page===6)return <Redirect to="/TipList" />;
        return(
            <div className='H-header' style={{width:this.state.width*0.8,height:this.state.width*0.25}} >
                <div className='head'>
                    <Breadcrumb style={{ margin: '16px 28px',paddingLeft:'10px'}}>
                        <Icon type="bank" theme="twoTone" />
                        <Breadcrumb.Item>  专题</Breadcrumb.Item>
                    </Breadcrumb>
                    <span className='more'>更多</span>
                </div>
                <div className='main'>
                    <div className='slideshow'>
                        <div className='slides' style={{marginLeft:this.state.length+"%",}}>
                            <div className='slide' >
                                <img src={require('../../assets/header/1.jpg')}></img>
                            </div>
                            <div className='slide' >
                                <img src={require('../../assets/header/2.jpg')}></img>
                            </div>
                            <div className='slide' >
                                <img src={require('../../assets/header/3.jpg')}></img>
                            </div>
                            <div className='slide' >
                                <img src={require('../../assets/header/4.jpg')}></img>
                            </div>
                            <div className='slide' >
                                <img src={require('../../assets/header/5.jpg')}></img>
                            </div>
                            <div className='slide' >
                                <img src={require('../../assets/header/1.jpg')}></img>
                            </div>
                        </div>
                    </div>
                    <div className='sections'>
                        <div className='up'>
                            <div className='section' id='s1' onClick={this.toTipList.bind(this,'react')}>
                                <span >【React 技术讨论】</span>
                            </div>
                            <div className='section' id='s2' onClick={this.toTipList.bind(this,'java')}>
                                <span >【Java 技术讨论】</span>
                            </div>
                        </div>
                        <div className='down'>
                            <div className='section' id='s3' onClick={this.toTipList.bind(this,'python')}>
                                <span >【python 技术讨论】</span>
                            </div>
                            <div className='section' id='s4' onClick={this.toTipList.bind(this,'vue')}>
                                <span >【Vue 技术讨论】</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;