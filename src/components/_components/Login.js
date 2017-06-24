import React from 'react'
import {Link} from 'react-router'
import { Tabs, Row, Col, Input, Icon, Button, Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

import ListErrors from '../ListErrors';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (username, password, type) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(username, password, type) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Component extends React.Component {
  constructor(){
    super();
    this.state={
      type: 'laixe',
      username: '',
      password: ''
    }

    this.submitForm = (username, password) => {
      let that = this;
      this.props.onSubmit(username, password, that.state.type);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const username = this.state.username;
    const password = this.state.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="loginWr">
              <h1 className="textCenter">Dang Nhap</h1>

              <ListErrors errors={this.props.errors} />

              <Row className="mt10 textCenter">
                <RadioGroup defaultValue={this.state.type} size="large"
                  onChange={(e) => {
                    let value = e.target.value
                    this.setState(prev => { return {
                      ...prev,
                      type: value
                    }})
                  }}
                >
                  <RadioButton value="laixe">Lai Xe</RadioButton>
                  <RadioButton value="thauphu">Thau Phu</RadioButton>
                  <RadioButton value="dieuhanh">Dieu Hanh</RadioButton>
                  <RadioButton value="it">IT</RadioButton>
                </RadioGroup>
              </Row>
              <Row className="mt20">
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>}
                       type="text"
                       value={username}
                       onChange={(e) => {
                         let value = e.target.value
                         this.setState(prev => {return {
                           ...prev,
                           username: value
                         }})
                       }}
                       placeholder="Ten Dang Nhap"
                />
              </Row>

              <Row className="mt10">
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}
                       type="password"
                       value={password}
                       onChange={(e) => {
                         let value = e.target.value
                         this.setState(prev => {return {
                           ...prev,
                           password: value
                         }})
                       }}
                       placeholder="Mat Khau"
                />
              </Row>
              <Row className="mt10">
                <Button
                  type="primary"
                  disabled={this.props.inProgress}
                  onClick={() => {
                    this.submitForm(username, password)
                  }}
                >
                  Sign in
                </Button>
              </Row>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
