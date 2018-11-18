import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Popover } from 'antd';
import CurrencyInput from 'react-currency-input';
import {
  checkTransfer,
  changeTransferForm,
  changeTransferStatus,
  doTransfer,
  getTransfers
} from './Transfers.actions';
import { getUser } from '../Dashboard.actions'
import TransferVerification from './transfer_verification/Transfer_verification';
import TransfersList from './transfers_list/Transfers_list'
import Modal from '../../../components/Modal';

import './Transfers.css'
class Trasnfers extends Component {

  componentDidMount() {
    const { getUser, dashboard } = this.props
    if (dashboard.userLogged._id) {
      getUser(dashboard.userLogged._id)
    } else {
      const id = sessionStorage.getItem('id')
      getUser(id)
    }
    this.props.getTransfers()
  }

  render() {
    const { checkTransfer,
      transfers,
      changeTransferStatus,
      doTransfer,
      changeTransferForm,
      dashboard,
    } = this.props
    const {
      history_transfers,
      newTransfer,
      status,
      loading_get_transfers,
      transfer_form,
      loading_new_transfer } = transfers

    const { userLogged } = dashboard
    return (
      <section className="transfers-container">
        <h2 className="transfers-title">Nova transferência</h2>
        <div className="do-transfers">
          <div className="email">
            <Input
              value={transfer_form.email}
              placeholder="Email"
              onChange={({ target }) => changeTransferForm({ key: 'email', value: target.value })} />
            <Popover
              placement="bottom"
              title={'Contatos'}
              content={userLogged.contacts
                .map((contact, key) =>
                  <Button onClick={() => changeTransferForm({ key: 'email', value: contact.email })}
                    className="btn-contact"
                    key={key}>{contact.name}</Button>)
              }
              trigger="click">
              <Button type="normal"
                onClick={console.log}
                icon="user"
                className="contacts"
                size={'large'}></Button>
            </Popover>

          </div>
          <CurrencyInput
            value={transfer_form.value}
            className="ant-input"
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$"
            onChange={(value) => changeTransferForm({ key: 'value', value })} />

          <Button
            className="btn-transfer"
            type="primary"
            icon="export"
            onClick={() => checkTransfer(transfer_form)}
            size={'small'}>Transferir</Button>
        </div>
        <h2 className="transfers-title transfers-list">Hitórico de transferências</h2>
        <TransfersList
          loading={loading_get_transfers}
          transfers={history_transfers}
          myUser={userLogged} />
        <Modal
          visible={status === 1}
          onClose={() => changeTransferStatus(0)}
          title="Cartão de crédito">
          Cartão de crédito
				</Modal>
        <Modal
          visible={status === 2}
          title="Confirmar Transferência"
          onClose={() => changeTransferStatus(0)}
          footer={[
            <Button key="back" onClick={console.log}>Cancelar</Button>,
            <Button key="submit"
              type="primary"
              loading={loading_new_transfer}
              onClick={() => doTransfer(newTransfer)}>
              Transferir
                        </Button>,
          ]}
        >
          <TransferVerification newTransfer={newTransfer} />
        </Modal>
      </section >
    );
  }
}

const mapStateToProps = ({ transfers, dashboard }) => ({ transfers, dashboard })

export default connect(mapStateToProps, {
  doTransfer,
  getTransfers,
  checkTransfer,
  changeTransferStatus,
  getUser,
  changeTransferForm,
})(Trasnfers);

