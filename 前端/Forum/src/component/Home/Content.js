import React, { Component } from 'react';
import './Content.css';
import 'antd/dist/antd.css';
import {hotsubInfo,newsubInfo} from './Data.js'
import { Row, Col ,Form, Tooltip,Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,Card,Avatar,Rate} from 'antd';
const { Header, Content, Footer } = Layout;
const { Meta } = Card;



class Home extends Component{
    constructor(prop){
        super(prop);
        this.state={
            width: window.screen.width,
        };
    }

    render(){
        return(
            <div>
                <div className="H-content" style={{width:this.state.width*0.8}}>
                    <Layout className="layout">
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ margin: '16px 0',paddingLeft:'10px'}}>
                                <Icon type="star" theme="twoTone" />
                                <Breadcrumb.Item>  热门帖子</Breadcrumb.Item>
                            </Breadcrumb>

                            <div style={{ background: '#ECECEC', padding: '10px' }}>
                                <Row gutter={16}>
                                    {
                                        hotsubInfo.map((element)=><Col span={6}>
                                                <Card style={{cursor:'pointer'}} title={element.title} bordered={false}
                                                      cover={<img alt="example" src={element.img}/>}
                                                >

                                                    HOT: <Rate disabled defaultValue={element.like} style={{marginLeft:"4px"}}/>

                                                </Card>
                                            </Col>
                                        )
                                    }

                                </Row>
                            </div>

                            <Breadcrumb style={{ margin: '16px 0',marginTop:'30px',paddingLeft:'10px'}}>
                                <Icon type="crown" theme="twoTone" />
                                <Breadcrumb.Item>  最新帖子</Breadcrumb.Item>
                            </Breadcrumb>

                            <div style={{ background: '#ECECEC', padding: '10px' }}>
                                <Row gutter={16}>
                                    {
                                        newsubInfo.map((element)=>
                                            <Col span={6}>
                                                <Card style={{cursor:'pointer'}}
                                                    title={element.title} bordered={false}
                                                      cover={<img alt="example" src={element.img} />}
                                                >
                                                    <Icon type="like" theme="twoTone" /> {element.like}
                                                    <Icon type="dislike" theme="twoTone" style={{marginLeft:'30px'}}/> {element.dlike}

                                                </Card>
                                            </Col>
                                        )
                                    }


                                </Row>
                            </div>




                        </Content>
                        <Footer style={{ textAlign: 'center' }}></Footer>
                    </Layout>


                </div>
            </div>
        );
    }
}

export default Home