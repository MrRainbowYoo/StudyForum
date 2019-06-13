import React, { Component } from 'react';
import "./Tab1.css"
import axios from 'axios';
import 'antd/dist/antd.css';


class Tab1 extends Component{
    constructor(props){
        super(props);
        this.state={
            Postlist:[],
            account:this.props.account
        }
    }
    componentWillMount() {
        let that=this
        axios({
            method: 'POST',
            url: 'http://120.79.15.252/Forum/GetMyPost',
            data:JSON.stringify({account:that.state.account})
        }).then(function(res){
            let postList
            postList = res.data;
            console.log(postList)
            that.setState({
                Postlist:postList.reverse(),
            })
        })
        
    }
    render(){
        // console.log(this.state.PostList)
        let PL=this.state.Postlist
        console.log("PL",PL)
        return(
            <div className="Tab1-wrapper">
                {
                    PL.map((element)=>
                        <div className="T1-tip">
                            <div className="T1-portrait">
                                <img  src={require('../../../assets/header/3.jpg')}/>
                            </div>

                            <div className="T1-info">
                                标题：
                                <span style={{backgroundColor:"lightblue"}}>{element.title}</span>
                                {/* <span style={{backgroundColor:"lightsalmon"}}>技术分享</span> */}
                            
                                <a>{element.time}</a>
                                
                            </div>

                            <div className="T1-abstract">
                                <p>{element.context}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Tab1;