import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Skeleton } from 'antd';
import { newCreditCard, getCreditCards, removeCreditCard } from './CreditCards.actions';
import { getUser } from '../Dashboard.actions';
import moment from 'moment';
import './CreditCards.css';
import { actions } from '../../../utils/constants';
import { convertToReal } from '../../../utils/functions';
import { AddCreditCard } from './AddCreditCard/AddCreditCard';


class CreditCards extends Component {
  constructor(props) {
    super(props)

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
                    <Button
                      type="primary"
                      icon="edit"
                      size="small" > Editar</Button>
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

export default connect(mapStateToProps, { getUser, newCreditCard, removeCreditCard, getCreditCards })(CreditCards);
