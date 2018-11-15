import React, { Component } from 'react';
import { Modal } from 'antd';

class ModalComponent extends Component {

    render() {
        const { visible, onOk, onCancel, children, title } = this.props;
        return (
            <div>
                <Modal
                    visible={visible}
                    title={title}
                    onOk={onOk}
                    onCancel={onCancel}>
                    {children}
                </Modal>
            </div>
        );
    }
}

export default ModalComponent