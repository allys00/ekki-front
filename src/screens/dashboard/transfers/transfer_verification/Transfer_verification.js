
import React, { Component } from 'react';

import './Transfer_verification.css'
import { convertToReal } from '../../../../utils/functions';
class TransferVerification extends Component {
    render() {
        const { recipient, value } = this.props.newTransfer
        return (
            <section className="transfers-container">
                <p>Transferencia para : {recipient.name}</p>
                <p>Valor : {convertToReal(value)}</p>
            </section >
        );
    }
}

export default TransferVerification

