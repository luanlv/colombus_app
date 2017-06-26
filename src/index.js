import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';

import App from './components/App';
import Article from './components/Article';
import Editor from './components/Editor';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileFavorites from './components/ProfileFavorites';
import Register from './components/Register';
import Settings from './components/Settings';

import HomeLaiXe from './components/laixe/Home';
import LaiXeThemDO from './components/laixe/DO';
import LaiXeListDO from './components/laixe/ListDO';
import LaiXeEditDO from './components/laixe/EditDO';

import LaiXeThemPhuPhi from './components/laixe/PhuPhi';
import LaiXeListPhuPhi from './components/laixe/ListPhuPhi';
import LaiXeEditPhuPhi from './components/laixe/EditPhuPhi';

import ThemLaiXe from './components/it/LaiXe';
import ThemThauPhu from './components/it/ThauPhu';
import ThemDieuHanh from './components/it/DieuHanh';
import HomeIT from './components/it/Home';
import ThemAutoFill from './components/it/AutoFill';


import HomeDieuHanh from './components/dieuhanh/Home';
import DieuHanhDO from './components/dieuhanh/ListDO';

import HomeThauPhu from './components/thauphu/Home';
import ThauPhuDanhSachLaiXe from './components/thauphu/ListLaiXe';
import ThauPhuThemLaiXe from './components/thauphu/LaiXe';

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="laixe" component={HomeLaiXe} />

        <Route path="laixe/themdo" component={LaiXeThemDO} />
        <Route path="laixe/danhsachdo" component={LaiXeListDO} />
        <Route path="laixe/do/:id" component={LaiXeEditDO} />

        <Route path="laixe/themphuphi" component={LaiXeThemPhuPhi} />
        <Route path="laixe/danhsachphuphi" component={LaiXeListPhuPhi} />
        <Route path="laixe/phuphi/:id" component={LaiXeEditPhuPhi} />

        <Route path="it" component={HomeIT} />
        <Route path="it/thauphu" component={ThemThauPhu} />
        <Route path="it/laixe" component={ThemLaiXe} />
        <Route path="it/dieuhanh" component={ThemDieuHanh} />
        <Route path="it/autofill" component={ThemAutoFill} />
  
        <Route path="dieuhanh" component={HomeDieuHanh} />
        <Route path="dieuhanh/do" component={DieuHanhDO} />
  
        <Route path="thauphu" component={HomeThauPhu} />
        <Route path="thauphu/laixe" component={ThauPhuDanhSachLaiXe} />
        <Route path="thauphu/themlaixe" component={ThauPhuThemLaiXe} />
        
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="editor" component={Editor} />
        <Route path="editor/:slug" component={Editor} />
        <Route path="article/:id" component={Article} />
        <Route path="settings" component={Settings} />
        <Route path="@:username" component={Profile} />
        <Route path="@:username/favorites" component={ProfileFavorites} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
