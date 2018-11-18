import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Skeleton } from 'antd';
import { getUser } from '../Dashboard.actions'

import './Home.css'
import { convertToReal } from '../../../utils/functions';

class Home extends Component {

  componentDidMount() {
    console.log("didMout")
    const { getUser, dashboard } = this.props
    if (dashboard.userLogged._id) {
      getUser(dashboard.userLogged._id)
    } else {
      const id = sessionStorage.getItem('id')
      getUser(id)
    }
  }

  render() {
    const { userLogged, loading } = this.props.dashboard
    const { balance } = userLogged
    return (
      <section className="home-container">
        <Card title="Saldo" style={{ width: 300 }}>
          <Skeleton paragraph={{ rows: 0 }} active loading={loading}>
            <p>R$ {convertToReal(balance)}</p>
          </Skeleton>
        </Card>
      </section>
    );
  }
}

const mapStateToProps = ({ dashboard }) => ({ dashboard })

export default connect(mapStateToProps, { getUser })(Home);
