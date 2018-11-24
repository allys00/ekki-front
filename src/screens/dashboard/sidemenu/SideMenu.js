import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Menu, Icon, Button } from 'antd';
import { routes } from '../../../App';
import { history } from '../../../config/redux-store';
import { logout } from '../Dashboard.actions'
import { Menu, Icon, Button } from 'antd';
import './SideMenu.css';

class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = { collapsed: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (window.innerWidth > 574) {
      this.setState({ collapsed: false, isCell: false })
    } else {
      this.setState({ collapsed: true, isCell: true })
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }



  render() {
    const { collapsed, isCell } = this.state
    return (
      <div className="side-menu-container">
        {collapsed && isCell &&
          <Button icon='menu-unfold' style={{ position: 'absolute', fontSize: '20px', border: 0 }} onClick={this.toggleCollapsed} />}
        {(!collapsed || !isCell) &&
          <Menu mode="inline" inlineCollapsed={collapsed}>
            <Menu.Item key="0" onClick={this.toggleCollapsed}>
              <Icon type='menu-fold' />
            </Menu.Item>
            <Menu.Item key="1" onClick={() => history.push(routes.HOME)}>
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => history.push(routes.CREDIT_CARDS)}>
              <Icon type="credit-card" />
              <span>Cartões de crédito</span>
            </Menu.Item>

            <Menu.Item key="3" onClick={() => history.push(routes.TRANSFERS)}>
              <Icon type="solution" />
              <span>Transfências</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => history.push(routes.CONTACTS)}>
              <Icon type="user" />
              <span>Contatos</span>
            </Menu.Item>
            <Menu.Item key="5" onClick={() => this.props.logout()}>
              <Icon type="logout" />
              <span>Sair</span>
            </Menu.Item>
          </Menu>
        }
      </div>
    );
  }
}



export default connect(null, { logout })(SideMenu);

