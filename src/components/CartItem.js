import { React, useContext } from 'react';
import { Context } from "../Context";

export default function CartItem(props) {
    const { id, status, name, weight, imgUrl, isSelected } = props;
    const { handleSelectItem } = props;
    const context = useContext(Context);

    return (
        <>
            <div className='cart-item' id={id}>
                <input type='checkbox' checked={isSelected}
                    onChange={() => handleSelectItem(id)} />
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
                                <img src="./images/icons/heart.svg" alt='heart' />
                                Save
                            </button>
                            <button onClick={() => context.remove(id)}>
                                <img src="./images/icons/trash.svg" alt='trash' />
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
