import React, { Component } from 'react';
import "./Tab2.css"
import 'antd/dist/antd.css';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { Redirect } from "react-router-dom";


// const data = [
//     {
//       actions: [<span>回复</span>],
//       author: 'Jacky',
//       avatar: require('../../../assets/PersonHome/portrait2.jpeg'),
//       content: (
//         <p>
//           We supply a series of design principles, practical patterns and high quality design
//           resources (Sketch and Axure), to help people create their product prototypes beautifully and
//           efficiently.
//         </p>
//       ),
//       datetime: (
//         <Tooltip
//           title={moment()
//             .subtract(1, 'days')
//             .format('YYYY-MM-DD HH:mm:ss')}
//         >
//           <span>
//             {moment()
//               .subtract(1, 'days')
//               .fromNow()}
//           </span>
//         </Tooltip>
//       ),
//     },
//     {
//       actions: [<span>回复</span>],
//       author: 'Troy',
//       avatar: require('../../../assets/PersonHome/portrait.jpeg'),
//       content: (
//         <p>
//           We supply a series of design principles, practical patterns and high quality design
//           resources (Sketch and Axure), to help people create their product prototypes beautifully and
//           efficiently.
//         </p>
//       ),
//       datetime: (
//         <Tooltip
//           title={moment()
//             .subtract(1, 'days')
//             .format('YYYY-MM-DD HH:mm:ss')}
//         >
//           <span>
//             {moment()
//               .subtract(1, 'days')
//               .fromNow()}
//           </span>
//         </Tooltip>
//       ),
      
//     },

//     {
//       actions: [<span>回复</span>],
//       author: 'Troy',
//       avatar: require('../../../assets/PersonHome/portrait2.jpeg'),
//       content: (
//         <p>
//           We supply a series of design principles, practical patterns and high quality design
//           resources (Sketch and Axure), to help people create their product prototypes beautifully and
//           efficiently.
//         </p>
//       ),
//       datetime: (
//         <Tooltip
//           title={moment()
//             .subtract(1, 'days')
//             .format('YYYY-MM-DD HH:mm:ss')}
//         >
//           <span>
//             {moment()
//               .subtract(1, 'days')
//               .fromNow()}
//           </span>
//         </Tooltip>
//       ),
      
//     },
  
//   ];

  

class Tab2 extends Component{
  constructor(props){
    super(props);
    this.state = {
      account:this.props.account,
      replyList:[],
      Page:0,
    }
  }

  componentWillMount(){
    let account = this.state.account;
    let that =this;
    axios({
      method: 'POST',
      data: JSON.stringify({account:account}),
      url: 'http://120.79.15.252/Forum/GetMyReply',
      }).then(function(res){
        let replyList
        replyList = res.data;
        console.log(replyList);
        that.setState({
            replyList:replyList,
      })
  })
  }

  toTip = (e) =>{
    let that = this;
    this.setState({
        Page:8,
      }
    )
    let targetTip = {
        targetAccount:that.state.account,
        targetPostID:e.currentTarget.getAttribute('postID'),
    }
    sessionStorage.setItem("targetTip",JSON.stringify(targetTip));

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
      let Page = this.state.Page;
      if (Page ===8 ) return <Redirect to={{
        pathname:'/TipInfo',
      }} />;
      if (Page ===9 ) return <Redirect to={{
        pathname:'/NewPersonHome',
      }} />;
        return(
            <div className="Tab2-wrapper">
                <div className="T2-tip">
                  <List
                      className="comment-list"
                      header={`${this.state.replyList.length} 条回复`}
                      itemLayout="horizontal"
                      dataSource={this.state.replyList}
                      renderItem={item => (
                      <li className="comment-item" >
                        <div className='userInfo'>
                          <img src={item.imgpath} account={item.owner} userName={item.userName} imgpath={item.imgpath} onClick={this.toOtherHome} />
                          <span>{item.userName}</span>
                        </div>
                        <div className='context' postID={item.postID} onClick={this.toTip}>
                          <span>{item.context}</span>
                          <text>{item.time}</text>
                        </div>
                         
                      </li>
                      )}
                  />,
                </div>
            </div>
        )
    }
}

export default Tab2;