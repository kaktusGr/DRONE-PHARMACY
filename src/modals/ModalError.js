import { React } from 'react';

export default function ModalError({ errorMessage, optional }) {
    return (
        <div className="modal-error">
            <img src="./images/icons/danger-circle.svg" alt="attention" />
            <hr />
            <h2>Error: <span>{errorMessage}.</span></h2>
            {optional && <h3>{optional}</h3>}
        </div>
    )
}
