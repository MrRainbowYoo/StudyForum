import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import './login.css';
import Home from '../Home/Home'
import axios from 'axios';
import 'antd/dist/antd.css';
import { Tabs,Row,Col,Input, Form, Icon,Checkbox,Button,Tooltip,Drawer} from 'antd';

import Msg from '../Msg/Msg'

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class Login extends Component{
    constructor(props){
      super(props);
      this.state = {
        isLogin:-1,
        confirmDirty: false,
        reg_checked: true,
        pass_checked: true,
        account:"",
        password:"",
        width:window.screen.width
        // autoCompleteResult: [],
      }
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    componentWillMount() {
      console.log(localStorage.getItem("accountInfo"))
      if(localStorage.getItem("accountInfo")!==null){
        let accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
        this.setState({
          account:accountInfo.account,
          password:accountInfo.pwd
          
        })
      }
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码输入不同');
        } else {
          callback();
        }
      };
    doLogin = (e) =>{
      e.preventDefault();
      let that = this;
	    let usr = e.currentTarget['usr_name'].value
	    let pwd = e.currentTarget['usr_password'].value
	    let data = {   account: usr, pwd:pwd  }
      axios({
        method: 'POST',
        url: 'http://120.79.15.252/Forum/Login',
        data: JSON.stringify(data),
      }).then(function(res){
        if(res.data=='' || JSON.stringify(res.data)=='{}'){
          Msg("登录失败")
        }
        else{
          console.log(res.data)
          let userInfo = res.data;
          if(that.state.pass_checked)
          {
            localStorage.setItem("accountInfo", JSON.stringify({account: usr, pwd: pwd}));
          }
            
          else
          {
            localStorage.clear()
          }

          sessionStorage.setItem("userInfo",JSON.stringify({
            account:usr,
            userName:userInfo.userName,
            imgpath:userInfo.imgpath,
            isLogin:1,
          }));
          Msg("登录成功")
          that.setState({isLogin:1})
        }
      });
    }
    register = (e) =>{
      if(this.state.reg_checked){
        e.preventDefault();
        let account = e.currentTarget['用户名'].value;
        let pwd = e.currentTarget['password'].value;
        let data = {account: account,pwd:pwd};
        if(account=="" || pwd==""){
          Msg("用户名密码不能为空")
        }
        else{
          axios({
            method: 'POST',
            url: 'http://120.79.15.252/Forum/Regist',
            data: JSON.stringify(data),
          }).then(function(res){
            if(res.data==1){
              Msg("注册成功")
            }
            else if(res.data==0){
              Msg("已存在该用户")
            }
            else{
              Msg("注册失败")
            }
          });
        }
      }
      else{
        Msg("请先阅读相关协定")
      }
    }
    onChange = (e) => {
      this.setState({
        reg_checked: e.target.checked
      })
    }
    onChange_rempass = (e) =>{
      this.setState({
        pass_checked: e.target.checked
      })
    }
    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
          };
        const { getFieldDecorator } = this.props.form;
        let isLogin = this.state.isLogin;
        if ( isLogin === 1 ) return <Redirect to={{
          pathname:'/Home',
        }} />
        return(
          <div className={"L-body"} style={{width:this.state.width}}>
          
              <div className={"L-slogan1"}>
                Computers do not solve problems,
              </div>
              <div className={"L-slogan2"}>
                they execute solution!
              </div>
            
            
            <div className={"L-wrapper"}>
                <Tabs defaultActiveKey="1" onChange={callback} >
                    <TabPane tab="登录" key="1" >
                        <Form onSubmit={this.doLogin}>
                                <Input id={"usr_name"}
                                    placeholder="请输入用户名"
                                    defaultValue={this.state.account}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    suffix={
                                        <Tooltip title="Jacky&123456">
                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)'}} />
                                        </Tooltip>
                                    }
                                />
                                <Input.Password id={"usr_password"}
                                                placeholder="请输入密码"
                                                defaultValue={this.state.password}
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                                <Checkbox onChange={this.onChange_rempass} defaultChecked={this.state.pass_checked}>记住密码</Checkbox>
                                <Button type="primary" htmlType={"submit"} block>登录</Button>
                                
                                <div style={{    
                                    float: "right",
                                    marginRight: "4px",
                                    fontSize: "12px", 
                                    marginTop: "16px"
                                }}><a href="">忘记密码</a></div>
                        </Form>
                    </TabPane>
                    <TabPane tab="注册" key="2" >
                        <Form {...formItemLayout} onSubmit={this.register}>
                                <Form.Item label="手机号" hasFeedback >
                                    {getFieldDecorator('用户名', {
                                            rules: [
                                            {
                                                required: true,
                                                message: '请输入你的用户名',
                                            },
                                            ],
                                    })(<Input style={{width:"90%"
                                                    ,marginLeft:"4px"}} id={'usr_newname'}/>)
                                }
                                </Form.Item>
                                <Form.Item label="密码" hasFeedback >
                                    {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                  required: true,
                                                  message: '请输入你的密码',
                                                },
                                                {
                                                  validator: this.validateToNextPassword,
                                                },
                                            ]
                                    })(<Input type="password" style={{width:"90%"
                                                    ,marginLeft:"4px"}} id={'usr_newpwd'}/>)
                                }
                                </Form.Item>
                                <Form.Item label="确认密码" hasFeedback>
                                    {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                  required: true,
                                                  message: '请确认你的密码',
                                                },
                                                {
                                                 validator: this.compareToFirstPassword,
                                                },
                                            ],
                                    })(<Input type="password" style={{width:"90%"
                                                    ,marginLeft:"4px"}}/>)
                                }
                                </Form.Item>
                                
                                
 
                              
                                <Checkbox  defaultChecked={this.state.reg_checked} onChange={this.onChange} style={{marginTop:"10px"}}>我已经阅读并同意相关协定</Checkbox>
                                <Button type="primary" htmlType={"submit"} block>注册</Button>
                                
                             
                        </Form>
                    </TabPane>
                </Tabs>


                
            </div>
          </div>
        )
    }
}





export default Form.create()(Login);

