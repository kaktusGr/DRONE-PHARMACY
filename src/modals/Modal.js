import { React } from 'react';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='modal-children'>
                    {children}
                </div>
                <button onClick={onClose}>
                    <img id="close" src="./images/icons/plus.svg" alt="close" />
                </button>
            </div>
        </div>
    )
}
