import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import './PersonHome.css'
import 'antd/dist/antd.css';
import Tab1 from '../PersonHome/Tab/Tab1'
import Tab2 from '../PersonHome/Tab/Tab2'
import Tab3 from '../PersonHome/Tab/Tab3'
import Tab4 from '../PersonHome/Tab/Tab4'
import { Layout,Tabs,Icon,Empty} from 'antd';
import Nav from "../Home/Nav";

const { Header, Footer, Sider, Content} = Layout;

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
  }

class PersonHome extends Component{
    constructor(props){
        super(props)
        if(sessionStorage.getItem("userInfo")!==null){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            this.state={
                width:window.screen.width,
                height:window.screen.height,
                isLogin:1,
                userName:userInfo.userName,
                imgpath:userInfo.imgpath,
                account:userInfo.account,
                isShow:false
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
                <div className="P-wrapper" style={{width:this.state.width*0.8}}>
                    <Layout>
                        <Header>
                            <div className="P-portrait" style={{width:this.state.width*0.05,height:this.state.width*0.05}}>
                                <img src={this.state.imgpath} />
                            </div>
                            <div className="P-nickname">
                                <span>{this.state.userName}</span>
                            </div>
                            {/* <div className="P-school">
                                <span>杭州师范大学</span>
                            </div> */}
                        </Header>
                        <Layout>
                            <Content>
                            <Tabs defaultActiveKey="1">
                                <TabPane
                                tab={
                                    <span >
                                    <Icon type="home" theme="twoTone" />
                                    我的帖子
                                    </span>
                                }
                                key="1"
                                >
                                <Tab1 account={this.state.account}/>
                                </TabPane>
                                <TabPane
                                tab={
                                    <span>
                                    <Icon type="smile" theme="twoTone" />
                                    回复
                                    </span>
                                }
                                key="2"
                                >
                                <Tab2 account={this.state.account} />
                                </TabPane>
                                <TabPane
                                tab={
                                    <span>
                                    <Icon type="heart" theme="twoTone"  />
                                    关注的帖子
                                    </span>
                                }
                                key="3"
                                >
                                <Tab3/>
                                </TabPane>
                                <TabPane
                                tab={
                                    <span>
                                    <Icon type="setting" theme="twoTone" />
                                    设置
                                    </span>
                                }
                                key="4"
                                >
                                <Tab4/>
                                </TabPane>
                            </Tabs>
                            </Content>
                            {/* <Sider>Sider</Sider> */}
                        </Layout>
                        {/* <Footer>Footer</Footer> */}
                    </Layout>
                </div>
            </div>
        )
    }
}

export default PersonHome;