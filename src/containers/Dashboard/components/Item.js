import React, { useState, useEffect } from 'react';
import "./_item.scss"

const Item = (props) => {
    console.log(props)
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const getQuantity = (val, itemPrice) => {
        setQuantity(val)
        setPrice(val * (itemPrice / 10))
    }

    const showQuantity = () => {
        return `${( quantity * 100 ) / 1000}kg`
    }

    const addItemtoCart = () => {
        props.addItem(( quantity * 100 ) / 1000, Math.round(price), props.item.name, props.item._id)
    }

    return (
        <React.Fragment>
            <div className="item-container" key={props.item._id}>
                <div className="item-left">
                    <p>Image here</p>
                </div>
                <div className="item-right">
                    <p className="item-name">{props.item.name}</p>
                    <div className="input-weight-div">
                        <input type="number" className="input-weight-number" onChange={e => getQuantity(e.target.value, props.item.price)} />
                        <p>&nbsp; x <span>100g</span> = {showQuantity()}</p>
                    </div>
                    <p className="item-price">₹{Math.round(price)}</p>
                </div>
                <button className="add-btn" onClick={() => addItemtoCart()}>Add</button>
            </div>
        </React.Fragment>
    );
};

export default Item;
