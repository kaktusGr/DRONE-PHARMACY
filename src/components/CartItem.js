import { React } from 'react';

export default function CartItem(props) {
    const { id, status, name, weight, imgUrl } = props;

    return (
        <>
            <div className='cart-item' id={id}>
                <input type='checkbox' defaultChecked />
                <img src={"http://localhost:8090" + imgUrl} alt='medication' />
                <label>
                    <div className='item-info'>
                        <div>
                            <h4>{name}</h4>
                            <p id='status'>{status}</p>
                        </div>
                        <div>
                            <p id='price'>$29.99</p>
                            <p id='weight'>{weight}G</p>
                        </div>
                    </div>
                    <div className='item-btns'>
                        <div className='qty'>
                            <button>–</button>
                            1
                            <button>+</button>
                        </div>
                        <div className='save-delete'>
                            <button>
                                <img src="./images/icons/heart.svg" alt='med' />
                                Save
                            </button>
                            <button>
                                <img src="./images/icons/trash.svg" alt='med' />
                                Delete
                            </button>
                        </div>
                    </div>
                </label>
            </div>
            <hr />
        </>
    )
}
