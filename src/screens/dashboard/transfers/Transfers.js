import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Icon, Input, Button } from 'antd';
import CurrencyInput from 'react-currency-input';
import { checkTransfer } from './Transfers.actions';
import Modal from '../../../components/Modal';

import './Transfers.css'
class Trasnfers extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: 'andrealys@gmail.com',
			value: 'R$00,00'
		}
	}

	render() {
		const { email, value } = this.state
		const { checkTransfer, transfers } = this.props
		const { history_transfers, newTransfer } = transfers
		console.log(newTransfer.status)
		return (
			<section className="transfers-container">
				<h2 className="transfers-title">Nova transferência</h2>
				<div className="do-transfers">
					<Input
						value={email}
						placeholder="Email"
						onChange={({ target }) => this.setState({ email: target.value })} />
					<CurrencyInput
						value={value}
						className="ant-input"
						decimalSeparator=","
						thousandSeparator="."
						prefix="R$"
						onChange={(value) => this.setState({ value })} />

					<Button
						className="btn-transfer"
						type="primary"
						icon="export"
						onClick={() => checkTransfer({ email, value })}
						size={'small'}>Transferir</Button>
				</div>
				<h2 className="transfers-title transfers-list">Hitórico de transferências</h2>
				<List
					itemLayout="horizontal"
					dataSource={history_transfers}
					renderItem={({ title, description }) => (
						<List.Item>
							<Icon type="arrow-up" />
							<List.Item.Meta
								title={<a href="https://ant.design"> {title}</a>}
								description={description}
							/>
						</List.Item>
					)} />
				<Modal visible={newTransfer.status === 1} title="Cartão de crédito">
					Cartões
				</Modal>
				<Modal visible={newTransfer.status === 2} title="Digitar Password">
					<Input />
				</Modal>
				<Modal visible={newTransfer.status === 3} title="Digitar Password">
					<span>{JSON.stringify(newTransfer)}</span>
				</Modal>
			</section >
		);
	}
}

const mapStateToProps = ({ transfers }) => ({ transfers })

export default connect(mapStateToProps, { checkTransfer })(Trasnfers);

