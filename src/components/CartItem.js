import { React, useState, useContext } from 'react';
import { Context } from "../Context";

export default function CartItem(props) {
    const { id, status, name, weight, imgUrl, isSelected } = props;
    const { handleSelectItem } = props;
    const context = useContext(Context);
    const [count, setCount] = useState(1);
    const [showInfo, setShowInfo] = useState(false);
    
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
                    {showInfo && <p className='show-info'>
                        Currently you can order only one medication in our store.
                    </p>}
                    <div className='item-btns'>
                        <div className='qty'>
                            <button onClick={() => {
                                setCount(0);
                                setTimeout(() => context.remove(id), 400);
                            }}>–</button>
                            {count}
                            <button onClick={() => {
                                setShowInfo(true);
                                setTimeout(() => setShowInfo(false), 4000);
                            }}>+</button>
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
