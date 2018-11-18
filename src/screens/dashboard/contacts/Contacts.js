import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUser } from '../Dashboard.actions'
import { Input, List, Skeleton, Button } from 'antd';
import { changeContactEmail, addContact, removeContact } from './Contacts.actions';
import './Contacts.css'


class Contacts extends Component {
  componentDidMount() {
    const { getUser, dashboard } = this.props
    if (dashboard.userLogged._id) {
      getUser(dashboard.userLogged._id)
    } else {
      const id = sessionStorage.getItem('id')
      getUser(id)
    }
  }

  render() {
    const { changeContactEmail, dashboard, contacts, addContact, removeContact } = this.props
    const { email, loading_add_contact, contact_being_removed } = contacts
    const { userLogged, loading_get_user } = dashboard

    return (
      <section className="contacts-container">
        <div className="add-contact">
          <Input value={email}
            placeholder="Email do novo contato"
            onChange={({ target }) => changeContactEmail(target.value)} />
          <Button
            type="primary"
            loading={loading_add_contact}
            onClick={() => addContact(email)}>{loading_add_contact ? 'Adicionando contato' : 'Adicionar contato'} </Button>
        </div>

        <h2 className="transfers-title transfers-list">Contatos</h2>
        <List
          itemLayout="horizontal"
          dataSource={loading_get_user ? fakeData() : userLogged.contacts}
          renderItem={({ name, email }) => {
            return (
              <Skeleton title={false} loading={loading_get_user} active>
                <List.Item
                  actions={[
                    <Button
                      loading={contact_being_removed === email}
                      onClick={() => removeContact(email)}
                      type="danger">{contact_being_removed === email ? 'Removendo' : 'Remover'}</Button>]}>
                  <List.Item.Meta
                    title={<a href="https://ant.design">
                      {name}
                    </a>}
                    description={email}
                  />
                </List.Item>
              </Skeleton>
            )
          }
          } />
      </section>
    );
  }
}
const fakeData = () => {
  let data = []
  for (let x = 0; x < 4; x++) {
    data.push({
      sender: {},
      recipient: {},
      value: 0,
      created_at: '',
    })
  }
  return data
}

const mapStateToProps = ({ dashboard, contacts }) => ({ dashboard, contacts })

export default connect(mapStateToProps, { getUser, addContact, removeContact, changeContactEmail })(Contacts);
