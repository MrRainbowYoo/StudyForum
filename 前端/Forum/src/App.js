import React, { Component } from 'react';
import { HashRouter , Route } from "react-router-dom";
import Home from './component/Home/Home'
import Login from './component/Login/login'
import PersonHome from './component/PersonHome/PersonHome'
import NewPersonHome from './component/PersonHome/NewPersonHome'
import Post from './component/Post/Post'
import TipList from './component/TipList/TipList'
import PersonCenter from './component/PersonCenter/PersonCenter'
import TipInfo from './component/TipInfo/TipInfo'
class App extends Component{
    render() {
      return (
        <HashRouter>
            <Route exact path="/" component={Login} />
            <Route path="/Home" component={Home} />
            <Route path="/PersonHome" component={PersonHome} />
            <Route path="/NewPersonHome" component={NewPersonHome} />
            <Route path="/PersonCenter" component={PersonCenter} />
            <Route path="/Post" component={Post} />
            <Route path="/Tiplist" component={TipList} />
            <Route path="/TipInfo" component={TipInfo} />
        </HashRouter>
      );
    }
}

export default App;
