import axios from 'axios';

function GetPostList(){
    var postList ;
    axios({
        method: 'GET',
        url: 'http://120.79.15.252/Forum/GetPostList',
      }).then(function(res){
          postList = res.data;
          
      })
      return postList;
}

const PostList=GetPostList()

export default PostList;
