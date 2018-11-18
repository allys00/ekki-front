import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SideMenu from './sidemenu/SideMenu';
import Header from './header/Header';
import CreditCards from './creditcards/CreditCards'
import Trasnfers from './transfers/Transfers';
import Contacts from './contacts/Contacts';
import { getUser } from './Dashboard.actions'
import { routes } from '../../App';

import './Dashboard.css'
import Home from './home/Home';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { userLogged } = this.props.dashboard
    return (
      <section className="dashboard-container">
        <Header userLogged={userLogged} />
        <div className="dashboard-content">
          <SideMenu />
          <div className="dashboard-router">
            <Switch>
              <Route path={routes.CREDIT_CARDS} render={() => <CreditCards />} />
              <Route path={routes.TRANSFERS} render={() => <Trasnfers />} />
              <Route path={routes.HOME} render={() => <Home />} />
              <Route path={routes.CONTACTS} render={() => <Contacts />} />
              <Redirect from={routes.DASHBOARD} to={routes.HOME} />
            </Switch>
          </div>
        </div>
      </section >
    );
  }
}


const mapStateToProps = ({ dashboard }) => ({ dashboard })

export default connect(mapStateToProps, { getUser })(Dashboard);
