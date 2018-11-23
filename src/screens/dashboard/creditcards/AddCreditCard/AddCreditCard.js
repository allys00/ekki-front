import React, { Component } from 'react'
import { Select, Button } from 'antd';
import { getDays } from '../../../../utils/functions';
const Option = Select.Option;

export class AddCreditCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            invoice: 1,
            flag: 'mastercard'
        }
    }

    render() {
        const { flag, invoice } = this.state
        const { loading, onClick } = this.props
        return (
            <div>
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
                    loading={loading}
                    onClick={() => onClick(this.state)}
                    className="btn-new-card"> {loading ? 'Gerando novo cartão' : 'Gerar cartão'} </Button>
            </div>
        )
    }
}

export default AddCreditCard
