import React, { Component } from 'react';
import { Card } from 'antd';

import './Home.css'
import { convertToReal } from '../../../utils/functions';

class Home extends Component {

  render() {
    const { balance } = this.props.userLogged
    return (
      <section className="home-container">
        <Card title="Saldo" style={{ width: 300 }}>
          <p>R$ {convertToReal(balance)}</p>
        </Card>
      </section>
    );
  }
}

export default Home