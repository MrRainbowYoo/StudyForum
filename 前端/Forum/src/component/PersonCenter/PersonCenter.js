import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import './PersonCenter.css'

import { Layout, Menu, Icon, Input, Radio, Button, Form, Spin} from 'antd';
import 'antd/dist/antd.css';
import Nav from "../Home/Nav";
import Msg from '../Msg/Msg'

const { Content,Sider } = Layout;
const { TextArea } = Input;

class PersonCenter extends Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem("userInfo")!==null){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            this.state={
                account:userInfo.account,
                userName:userInfo.userName,
                imgpath:userInfo.imgpath,
                isLogin:1,
                nowKey:1,
                page:0,
                confirmDirty: false,
                autoCompleteResult: [],
                isFinish: false,
                Spin:false,
                isShow:true,
            }
        }
        else{
            this.state={
                isLogin:0,
            }
        }
    };
    handleClick = (e)=>{
        console.log(e.key);
        this.setState({
            nowKey:e.key,
        })
    };
    toPersonHome = (e)=>{
        this.setState({
            page:1
        })
        console.log(this.state.nowKey)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        let that = this
        let oldPassword = e.currentTarget['oldPassword'].value;
        let newPassword = e.currentTarget['newPassword'].value;
        let account = this.state.account;
        let data = {OldPassword:oldPassword,NewPassword:newPassword,account:account};
        this.setState({
            Spin:true
        });
        axios({
            method: 'POST',
            url: 'http://120.79.15.252/Forum/UpdatePassword',
            data: JSON.stringify(data),
        }).then(function (res) {
            that.setState({
                Spin:false,
            })
            console.log(res.data)
            if(res.data===-1){
                Msg('更改失败，请重新尝试！')
            }else if(res.data===0){
                Msg('旧密码错误！')
            }else{
                Msg('密码更改成功！')
            }
        })
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    doSave = (e) =>{
        e.preventDefault();
        let that = this;
        let userName = e.currentTarget['userName'].value;
        let account = this.state.account;
        let data = {userName:userName,account:account};
        console.log(userName,account);
        if(userName===''){
            Msg('用户名不允许为空');
        }else{
            axios({
                method: 'POST',
                url: 'http://120.79.15.252/Forum/UpdateName',
                data: JSON.stringify(data),
            }).then(function (res) {
                console.log(res.data)
                if(res.data===1){
                    Msg('保存成功');
                    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                    userInfo.userName = userName;
                    sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
                    that.setState({
                        userName:userName,
                    })
                }else{
                    Msg('保存失败，请重新尝试')
                }
            })
        }
    }
    doUpload = (e) => {
        this.setState({isFinish: false,Spin:true})

        let file = e.currentTarget;
        var forms = new FormData()
        var configs = {
            headers: {'Content-Type': 'multipart/form-data'}
        };
        forms.append('account',this.state.account);
        forms.append('file', file.files[0])
        axios.post('http://120.79.15.252/Forum/UpdateFace', forms, configs).then(res => {
            console.log(res.data);
            // console.log(JSON.stringify(res.data))
            if(res.data===-1){
                Msg('更改失败，请重新尝试！')
            }else{
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                userInfo.imgpath = res.data;
                sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
                this.setState({isFinish: true,imgpath:res.data,Spin:false});
                Msg('更改成功!');
            }
        })
    }


    render(){
        let isLogin = this.state.isLogin;
        if(isLogin===0){
            return <Redirect to='/'/>
        }
        if(this.state.page===1){
            return <Redirect to="/PersonHome/PersonHome"/>
        }
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return(
            <div>
                {/*<div className="Pe-topBar"></div>*/}
                <Nav userName={this.state.userName} imgpath={this.state.imgpath} account={this.state.account} isShow={this.state.isShow}/>
                <div className="Pe-main">
                    <Layout>
                        <Sider
                            breakpoint="lg"
                            // collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                            style={{backgroundColor:"#fafafa",borderRight:'1px solid #e1e2e5'}}
                        >
                            <div className="Pe-title">个人中心</div>
                            <Menu mode="inline" defaultSelectedKeys={['1']} style={{backgroundColor:'#fafafa',borderRight:'none'}}>
                                <Menu.Item key="1" onClick={this.handleClick.bind(this)}>
                                    <Icon type="user" />
                                    <span className="nav-text">我的信息</span>
                                </Menu.Item>
                                <Menu.Item key="2" onClick={this.handleClick.bind(this)}>
                                    <Icon type="smile" />
                                    <span className="nav-text">我的头像</span>
                                </Menu.Item>
                                <Menu.Item key="3" onClick={this.handleClick.bind(this)}>
                                    <Icon type="safety" />
                                    <span className="nav-text">更改密码</span>
                                </Menu.Item>
                                <Menu.Item key="4" onClick={this.toPersonHome.bind(this)}
                                           style={{borderTop:'1px solid #e1e2e5',borderBottom:'1px solid #e1e2e5'
                                           }}>
                                    <span className="nav-text">个人空间</span>
                                    <b style={{width:'56px', display:'inline-block'}}></b>
                                    <Icon type="right" />
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            {/*Content-我的信息*/}
                            <Content style={{display:this.state.nowKey==1?'block':'none'}}>
                                <div style={{background: '#fff', minHeight: 520, }}>
                                    <div className="Pe-rightTitle">我的信息</div>
                                    <Form onSubmit={this.doSave}>
                                        <div className="Pe-form">
                                            <div className="form-item">
                                                <label className='form-title'>昵称：</label>
                                                <Input className='input-name-text' name="userName" id="userName" defaultValue={this.state.userName}  allowClear/>
                                            </div>
                                            <div className="form-item">
                                                <label className='form-title'>账号：</label>
                                                <span className='form-account-text'>{this.state.account}</span>
                                            </div>
                                            <div className="form-item">
                                                <span className='form-title'>我的签名：</span>
                                                <TextArea rows={5} placeholder='设置您的签名'/>
                                            </div>
                                            <div className="form-item">
                                                <span className='form-title'>性别：</span>
                                                <Radio.Group defaultValue="secret" buttonStyle="solid">
                                                    <Radio.Button value="boy">男</Radio.Button>
                                                    <Radio.Button value="girl">女</Radio.Button>
                                                    <Radio.Button value="secret">保密</Radio.Button>
                                                </Radio.Group>
                                            </div>
                                        </div>
                                        <div id='save-btn'>
                                            <Button type="primary" htmlType={"submit"} block>保存</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Content>

                            {/*Content-我的头像*/}
                            <Content style={{display:this.state.nowKey==2?'block':'none'}}>
                                <div style={{background: '#fff', minHeight: 520 }}>
                                    <div className="Pe-rightTitle">我的头像</div>
                                    <div className="face-tool">
                                        <img src={this.state.imgpath} className='avatar'/>
                                        <div id='save-btn'>
                                            <div className="m-wrap">
                                                <input type="file" className="m-btn" id="uploadFile" onChange={this.doUpload}/>
                                                <a className="m-btn"  id="uploadBtn" >更改头像</a>
                                            </div>
                                            <div className="show-Spin" style={{marginTop:10,display:this.state.Spin===false?'none':'inline-block'}}>
                                                <Spin />&nbsp; 更改中....
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Content>
                            <Content style={{display:this.state.nowKey==3?'block':'none'}}>
                                <div style={{background: '#fff', minHeight: 520 }}>
                                    <div className="Pe-rightTitle">修改密码</div>
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{marginLeft:0}}>
                                        <Form.Item label="旧密码" hasFeedback>
                                            {getFieldDecorator('oldPassword', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入您的旧密码',
                                                    },
                                                ],
                                            })(<Input.Password name="oldPassword"/>)}
                                        </Form.Item>
                                        <Form.Item label="新密码" hasFeedback>
                                            {getFieldDecorator('password', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入您的新密码',
                                                    },
                                                    {
                                                        validator: this.validateToNextPassword,
                                                    },
                                                ],
                                            })(<Input.Password name="newPassword"/>)}
                                        </Form.Item>
                                        <Form.Item label="确认新密码" hasFeedback>
                                            {getFieldDecorator('confirm', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请确认您的新密码',
                                                    },
                                                    {
                                                        validator: this.compareToFirstPassword,
                                                    },
                                                ],
                                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit">
                                                确认更改
                                            </Button>
                                        </Form.Item>
                                        <div className="show-Spin" style={{display:this.state.Spin===false?'none':'inline-block'}}>
                                            <Spin />&nbsp; 更改中....
                                        </div>
                                    </Form>
                                </div>
                            </Content>
                            <Content style={{display:this.state.nowKey==4?'block':'none'}}>
                                <div style={{ padding: 24, background: '#fff', minHeight: 520 }}>个人空间</div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        );
    }

}

export default Form.create()(PersonCenter)
