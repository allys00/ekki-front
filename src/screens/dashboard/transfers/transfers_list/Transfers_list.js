
import React, { Component } from 'react';
import { List, Icon, Skeleton, Pagination, Button } from 'antd';
import { convertToReal } from '../../../../utils/functions'
import TransferVerification from '../transfer_verification/Transfer_verification';
import Modal from '../../../../components/Modal';
import './Transfers_list.css'


class TransfersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            currentItens: [],
            totalPaggination: 0,
            currentTransfer: {},
            showTransferDetails: false
        }
        this.totalPaggination = this.totalPaggination.bind(this)
        this.currentItens = this.currentItens.bind(this)

    }

    currentItens = () => {
        const { transfers } = this.props
        const { currentPage } = this.state
        let currentItens = []
        const itemsStart = currentPage === 1 ? 0 : (currentPage - 1) * 7
        for (let x = itemsStart; x < itemsStart + 6; x++) {
            if (transfers[x]) currentItens.push(transfers[x])
        }
        return currentItens
    }

    totalPaggination = () => {
        return Math.round(this.props.transfers.length / 4)
    }


    render() {
        const { transfers, loading, myUser } = this.props
        const { showTransferDetails, currentTransfer } = this.state
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={loading ? fakeData() : this.currentItens()}
                    renderItem={(transfer) => {
                        const isSender = transfer.sender._id === myUser._id
                        return (
                            <List.Item>
                                <Skeleton title={false} loading={loading} active>
                                    <Icon
                                        type={isSender ? 'arrow-up' : 'arrow-down'}
                                        style={{ color: isSender ? 'red' : 'green' }} />
                                    <List.Item.Meta
                                        onClick={() => this.setState({ currentTransfer: transfer, showTransferDetails: true })}
                                        title={<span> {isSender ? transfer.recipient.name : transfer.sender.name}</span>}
                                        description={convertToReal(transfer.value)}
                                    />
                                </Skeleton>
                            </List.Item>
                        )
                    }
                    } />
                <Modal
                    visible={showTransferDetails}
                    title="Confirmar Transferência"
                    onClose={() => this.setState({ currentTransfer: {}, showTransferDetails: false })}
                    footer={[<Button key="back" onClick={() => this.setState({ currentTransfer: {}, showTransferDetails: false })} >
                        Fechar</Button>]}>
                    <TransferVerification newTransfer={currentTransfer} />
                </Modal>
                <Pagination
                    defaultCurrent={1}
                    onChange={(currentPage) => this.setState({ currentPage })}
                    total={transfers.length}
                    pageSize={7} />
            </div >
        );
    }
}

const fakeData = () => {
    let data = []
    for (let x = 0; x < 6; x++) {
        data.push({
            sender: {},
            recipient: {},
            value: 0,
            created_at: '',
        })
    }
    return data
}
export default TransfersList

