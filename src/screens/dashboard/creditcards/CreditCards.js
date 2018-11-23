import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Skeleton, Select, Popover } from 'antd';
import { newCreditCard, getCreditCards, removeCreditCard, editCreditCard } from './CreditCards.actions';
import { getUser } from '../Dashboard.actions';
import moment from 'moment';
import './CreditCards.css';
import { actions } from '../../../utils/constants';
import { convertToReal, getDays } from '../../../utils/functions';
import { AddCreditCard } from './AddCreditCard/AddCreditCard';
const Option = Select.Option;

class CreditCards extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.selectDay = this.selectDay.bind(this)
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

  selectDay(credit_card) {
    const { invoice } = this.state
    const { loading_edit_credit_cards } = this.props.credit_cards
    return (<div>
      <Select
        style={{ width: '100%' }}
        defaultValue={credit_card.invoice}
        onChange={(value) => this.setState({ invoice: value })}
        placeholder="Vencimento">
        {getDays().map((day, key) =>
          <Option
            key={key}
            value={day}>{day}
          </Option>
        )}
      </Select>
      <Button
        type="primary"
        loading={loading_edit_credit_cards}
        onClick={() => this.props.editCreditCard(invoice, credit_card)}
        style={{ marginTop: '10px', width: '100%' }}>
        {loading_edit_credit_cards ? 'Salvando' : 'Salvar'}
      </Button>
    </div>)
  }


  render() {
    const { newCreditCard, dashboard, removeCreditCard, credit_cards, openFromModal, clickInCard } = this.props
    const { loading_get_credit_cards, loading_new_credit_card } = credit_cards
    const { userLogged, loading_get_user } = dashboard
    return (
      <section className="credit-cards-container">
        {(!openFromModal || userLogged.credit_cards.length <= 0) && < AddCreditCard onClick={newCreditCard} loading={loading_new_credit_card} />}
        <h2 className="transfers-title">Seus cartões de crédito</h2>
        <div className="credit-card-list">
          <Skeleton loading={loading_get_user} active>
            {userLogged.credit_cards.map((credit_card, key) =>
              <div key={key} className="credit-card-item" style={{ cursor: clickInCard ? 'pointer' : 'unset' }} onClick={() => clickInCard ? clickInCard(credit_card) : () => { }}>
                <Skeleton loading={loading_get_credit_cards} active>
                  <p ><b>Número: </b> {credit_card.number}</p>
                  <p ><b>Bandeira: </b> {credit_card.flag}</p>
                  <p ><b>Crédito disponivel: </b> {convertToReal(credit_card.credit)}</p>
                  <p ><b>Dia de vencimento: </b> {credit_card.invoice}</p>
                  <p ><b>Data de expiração: </b> {moment(credit_card.expiration).format('MM/YY')}</p>
                  {!openFromModal && <p className="actions">
                    <Popover placement="bottom"
                      trigger="click"
                      title={'Vencimento'}
                      content={this.selectDay(credit_card)}>
                      <Button
                        type="primary"
                        icon="edit"
                        size="small" > Editar
                        </Button>
                    </Popover>
                    <Button
                      type="danger"
                      icon="delete"
                      size="small"
                      onClick={() => removeCreditCard(credit_card._id)}>Remover</Button>
                  </p>}
                </Skeleton>
              </div>
            )}
            {userLogged.credit_cards.length <= 0 &&
              <h5 style={{ margin: 'auto' }}>Não possui cartão de crédito</h5>}
          </Skeleton>
        </div>
      </section >
    );
  }
}


const mapStateToProps = ({ dashboard, credit_cards }) => ({ dashboard, credit_cards })

export default connect(mapStateToProps, {
  getUser,
  newCreditCard,
  removeCreditCard,
  getCreditCards,
  editCreditCard
})(CreditCards);
