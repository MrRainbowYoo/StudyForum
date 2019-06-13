import React, { Component } from 'react';
import "./Tab4.css"
import 'antd/dist/antd.css';
import { Switch, Icon } from 'antd';

class Tab4 extends Component{
    render(){
        return(
            <div className="Tab4-wrapper">
                <div className='T4-tip'>
                    <span className="Tab4-title1">访问设置</span>
                    <div className="Tab4-checkprivacy">
                        <section >
                            <span>主页</span>
                            <Switch size="small" defaultChecked />
                            <a>公开</a>
                        </section>
                        <section>
                            <span>订阅</span>
                            <Switch size="small" defaultChecked />
                            <a>公开</a>
                        </section>
                    </div>
                </div>

                <div className='T4-tip'>
                    <span className="Tab4-title1">隐私设置</span>
                    <div className="Tab4-checkprivacy">
                        <section >
                            <span>个人头像</span>
                            <Switch size="small" defaultChecked />
                            <a>公开</a>
                        </section>
                        <section>
                            <span>个性签名</span>
                            <Switch size="small" defaultChecked />
                            <a>公开</a>
                        </section>
                        <section>
                            <span>个人信息</span>
                            <Switch size="small" defaultChecked />
                            <a>公开</a>
                        </section>
                    </div>
                </div>
            </div>

            
        )
    }
}

export default Tab4;