import React, { Component } from 'react';
import { List, Icon } from 'antd';
import './Transfers.css'
class Trasnfers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  data = [
    {
      title: 'André Alys',
      description: 'R$ 200,00',
      
    },
    {
      title: 'Julia Helen',
      description: 'R$ 150,00'
    },
    {
      title: 'Pedro Matheus',
      description: 'R$ 300,00'
    },
    {
      title: 'Lucas',
      description: 'R$ 400,00'
    },
  ];

  render() {
    const { doLogin } = this.props
    return (
      <section className="transfers-container">
        <List
          itemLayout="horizontal"
          dataSource={this.data}
          renderItem={({ title, description }) => (
            <List.Item>
              <Icon type="arrow-up" />
              <List.Item.Meta
                title={<a href="https://ant.design"> {title}</a>}
                description={description}
              />
            </List.Item>
          )}
        />,
      </section >
    );
  }
}
export default Trasnfers
