import React from 'react';
import { Modal } from 'antd';

const ModalComponent = ({ visible, footer, children, title, onClose }) => (
    <div>
        <Modal
            onCancel={onClose}
            visible={visible}
            title={title}
            footer={footer}
        >
            {children}
        </Modal>
    </div>
);

export default ModalComponent