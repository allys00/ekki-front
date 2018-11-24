
import React, { Component } from 'react';
import { convertToReal } from '../../../../utils/functions'
import './Transfer_verification.css'
class TransferVerification extends Component {
    render() {
        const { recipient, value, credit } = this.props.newTransfer
        return (
            <section className="transfers-container">
                {recipient && <p>Transferencia para : {recipient.name}</p>}
                {credit && <p>Valor debitado da conta : {convertToReal(value - credit.value)}</p>}
                {credit && <p>Valor pago no crédito: {convertToReal(credit.value)}</p>}
                {credit && <p>Numero do cartão: {credit.number}</p>}
                <p>Valor: {convertToReal(value)}</p>
            </section >
        );
    }
}

export default TransferVerification

