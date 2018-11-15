import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Menu, Icon } from 'antd';
import { routes } from '../../../App';
import { history } from '../../../config/redux-store';
import {logout} from '../Dashboard.actions'

import './SideMenu.css';

class SideMenu extends Component {

  render() {
    return (
      <div className="side-menu-container">
        <Menu>
          <Menu.Item key="1" onClick={() => history.push(routes.HOME)}>
            <Icon type="home" />
            Home
            </Menu.Item>
          <Menu.Item key="2" onClick={() => history.push(routes.CREDIT_CARDS)}>
            <Icon type="credit-card" />
            Cartões de crédito
            </Menu.Item>

          <Menu.Item key="3" onClick={() => history.push(routes.TRANSFERS)}>
            <Icon type="solution" />
            Transfências
          </Menu.Item>
          <Menu.Item key="4" onClick={() => this.props.logout()}>
            <Icon type="logout" />
            Sair
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}



export default connect(null, { logout })(SideMenu);

