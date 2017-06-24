import agent from '../agent';
// import Header from './Header';
import {Link} from 'react-router'
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT,
  LOGOUT} from '../constants/actionTypes';

import { Layout, Menu, Button } from 'antd';
const { Header, Content, Footer } = Layout;

import {Login} from './_components'

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {

    if (this.props.appLoaded) {
      if (!this.props.currentUser) {
        return (<div id="login">
          <Login />
        </div>)
      } else {
        return (
          <Layout>
            <Header style={{ position: 'fixed', width: '100%', height: 48, zIndex: 100 }}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '48px' }}
              >
                <Menu.Item key="1">
                  <Link  to="/">Trang chủ</Link>
                </Menu.Item>
                <Menu.Item key="3" style={{float: 'right'}}>
                  <Button
                    type="danger"
                    onClick={this.props.onClickLogout}>
                    Dang suat
                  </Button>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ marginTop: 48 }}>
              <div style={{ background: '#fff', minHeight: 500 }}>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Colombus ©2017 Created by Vnguy.Com
            </Footer>
          </Layout>
        )
      }
    }
    return (
      <div>

        Loading ...

      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
