import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Select, Button, Skeleton } from 'antd';
import { newCreditCard, getCreditCards, removeCreditCard } from './CreditCards.actions';
import { getUser } from '../Dashboard.actions';
import moment from 'moment';
import './CreditCards.css';
import { actions } from '../../../utils/constants';
const Option = Select.Option;

const getDays = () => {
  let days = []
  for (let x = 1; x <= 30; x++) {
    days.push(x)
  }
  return days
}

class CreditCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: 1,
      flag: 'mastercard'
    }
  }

  componentDidMount() {
    const { getUser, dashboard } = this.props
    if (dashboard.userLogged._id) {
      getUser(dashboard.userLogged._id, actions.ASYNC_GET_CREDIT_CARDS)
    } else {
      const id = sessionStorage.getItem('id')
      getUser(id, actions.ASYNC_GET_CREDIT_CARDS)
    }
  }

  render() {
    const { newCreditCard, dashboard, removeCreditCard, credit_cards } = this.props
    const { loading_get_credit_cards, loading_new_credit_card } = credit_cards
    const { userLogged, loading_get_user } = dashboard
    const { flag, invoice } = this.state
    console.log(loading_get_credit_cards)
    return (
      <section className="credit-cards-container">
        <h2 className="transfers-title">Criar novo cartão de crédito</h2>
        <div className="form-card">
          <div className="form-field">
            <p>Vencimento</p>
            <Select
              style={{ width: '100%' }}
              defaultValue="1"
              onChange={(value) => this.setState({ invoice: value })}
              value={invoice}
              placeholder="Vencimento">
              {getDays().map((day, key) =>
                <Option
                  key={key}
                  value={day}>{day}
                </Option>
              )}
            </Select>
          </div>
          <div className="form-field">
            <p>Bandeira</p>
            <Select
              value={flag}
              placeholder="Bandeira do cartão"
              onChange={(value) => this.setState({ flag: value })}
              style={{ width: '100%' }}
              defaultValue="mastercard">
              <Option value="mastercard">MasterCard</Option>
              <Option value="visa">Visa</Option>
            </Select>
          </div>
        </div >
        <Button
          type="primary"
          loading={loading_new_credit_card}
          onClick={() => newCreditCard(this.state)}
          className="btn-new-card"> {loading_new_credit_card ? 'Gerando novo cartão' : 'Gerar cartão'} </Button>
        <h2 className="transfers-title">Seus cartões de crédito</h2>
        <div className="credit-card-list">
          <Skeleton loading={loading_get_user} active>
            {userLogged.credit_cards.map((credit_card, key) =>
              <div key={key} className="credit-card-item">
                <Skeleton loading={loading_get_credit_cards} active>
                  <p ><b>Número: </b> {credit_card.number}</p>
                  <p ><b>Bandeira: </b> {credit_card.flag}</p>
                  <p ><b>Crédito disponivel: </b> {credit_card.credit}</p>
                  <p ><b>Dia de vencimento: </b> {credit_card.invoice}</p>
                  <p ><b>Data de expiração: </b> {moment(credit_card.expiration).format('MM/YY')}</p>
                  <p className="actions">
                    <Button
                      type="primary"
                      icon="edit"
                      size="small" > Editar</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size="small"
                      onClick={() => removeCreditCard(credit_card._id)}>Remover</Button>
                  </p>
                </Skeleton>
              </div>
            )}
          </Skeleton>
        </div>
      </section >
    );
  }
}


const mapStateToProps = ({ dashboard, credit_cards }) => ({ dashboard, credit_cards })

export default connect(mapStateToProps, { getUser, newCreditCard, removeCreditCard, getCreditCards })(CreditCards);
