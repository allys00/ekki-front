
import React, { Component } from 'react';
import { List, Icon, Skeleton, Pagination } from 'antd';
import { convertToReal } from '../../../../utils/functions'
import './Transfers_list.css'


class TransfersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            currentItens: [],
            totalPaggination: 0
        }
        this.totalPaggination = this.totalPaggination.bind(this)
        this.currentItens = this.currentItens.bind(this)

    }

    currentItens = () => {
        const { transfers } = this.props
        const { currentPage } = this.state
        let currentItens = []
        const itemsStart = currentPage === 1 ? 0 : (currentPage - 1) * 5
        for (let x = itemsStart; x < itemsStart + 4; x++) {
            if (transfers[x]) currentItens.push(transfers[x])
        }
        return currentItens
    }

    totalPaggination = () => {
        return Math.round(this.props.transfers.length / 4)
    }


    render() {
        const { transfers, loading, myUser } = this.props
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={loading ? fakeData() : this.currentItens()}
                    renderItem={({ sender, recipient, value }) => {
                        const isSender = sender._id === myUser._id
                        return (
                            <List.Item>
                                <Skeleton title={false} loading={loading} active>
                                    <Icon
                                        type={isSender ? 'arrow-up' : 'arrow-down'}
                                        style={{ color: isSender ? 'red' : 'green' }} />
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">
                                            {isSender ? recipient.name : sender.name}
                                        </a>}
                                        description={convertToReal(value)}
                                    />
                                </Skeleton>
                            </List.Item>
                        )
                    }
                    } />
                <Pagination
                    defaultCurrent={1}
                    onChange={(currentPage) => this.setState({ currentPage })}
                    total={transfers.length}
                    pageSize={5} />
            </div>
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
export default TransfersList

