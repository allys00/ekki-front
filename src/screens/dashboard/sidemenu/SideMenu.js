import React, { Component } from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom';
import './SideMenu.css';
import { routes } from '../../../App';
import { history } from '../../../config/redux-store';

const { SubMenu } = Menu;

class SideMenu extends Component {

  render() {
    return (
      <div className="">
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
            Histórico de transfências
          </Menu.Item>
          <Menu.Item key="4" onClick={() => history.push(routes.LOGIN)}>
            <Icon type="logout" />
            Sair
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SideMenu