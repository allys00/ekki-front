import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SideMenu from './sidemenu/SideMenu';
import Header from './header/Header';
import CreditCards from './creditcards/CreditCards'
import Trasnfers from './transfers/Transfers';
import { getUser } from './Dashboard.actions'
import { routes } from '../../App';

import './Dashboard.css'
import Home from './home/Home';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { getUser, dashboard } = this.props
    if (dashboard.userLogged._id) {
      this.props.getUser(dashboard.userLogged._id)
    } else {
      const id = sessionStorage.getItem('id')
      this.props.getUser(id)
    }
  }

  render() {
    const { userLogged } = this.props.dashboard
    return (
      <section className="dashboard-container">
        <Header />
        <SideMenu />
        <div className="dashboard-content">
          <Switch>
            <Route path={routes.CREDIT_CARDS} render={() => <CreditCards userLogged={userLogged} />} />
            <Route path={routes.TRANSFERS} render={() => <Trasnfers userLogged={userLogged} />} />
            <Route path={routes.HOME} render={() => <Home userLogged={userLogged} />} />
            <Redirect from={routes.DASHBOARD} to={routes.HOME} />
          </Switch>
        </div>
      </section >
    );
  }
}

const mapStateToProps = ({ dashboard }) => ({ dashboard })

export default connect(mapStateToProps, { getUser })(Dashboard);
