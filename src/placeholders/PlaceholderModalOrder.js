import { React } from "react";

export default function PlaceholderModalOrder() {
    return (
        <div className="placeholder">
            <div className="modal-titles">
                <span className="animated-bg animated-title">&nbsp;</span>
                <span className="animated-bg animated-text">&nbsp;</span>
            </div>
            <div className='modal-order-status'>
                <span className="animated-bg animated-text">&nbsp;</span>
            </div>
            <div className='modal-map'>
                <div id="img" className="animated-bg"></div>
            </div>
            <div className='modal-order-details'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan='4'><span className="animated-bg animated-title">&nbsp;</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                        </tr>
                        <tr>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                        </tr>
                        <tr>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                            <td><span className="animated-bg animated-title">&nbsp;</span></td>
                        </tr>
                        <tr>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                            <td><span className="animated-bg animated-text">&nbsp;</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
