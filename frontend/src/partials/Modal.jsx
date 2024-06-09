import React from 'react';
import styled from 'styled-components'

const Modal = ({ isOpen, onClose, modalTitle, children }) => {
	if (!isOpen) return null;

	return (
		<OverLay>
			<ModalContent>
				<ModalTitle>
					<h3>{modalTitle}</h3>
				</ModalTitle>

				<CloseButton onClick={() => { onClose(false); }}>
					<i className="fa-solid fa-xmark"></i>
				</CloseButton>

				{children}
			</ModalContent>
		</OverLay>
	);
};


// Se declaran los styled-components
const OverLay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	min-width: 300px;
	max-height: 90vh;
	overflow-y: auto;
    position: relative;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
`;

const ModalTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom:10px;
    border-bottom: 1px solid #FF6600;
    

    h3 {
        font-weight: 500;
        font-size: 16px;
        color:1766DC;
    }
`;

const CloseButton = styled.div`
    position: absolute;
    top: 20px;
    right: 10px;

    width: 30px;
    height: 30px;
    border: none;
    background: none;
    color: 1766DC;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;

`;

export default Modal;
