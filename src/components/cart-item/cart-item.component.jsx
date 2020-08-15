import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: {imageUrl, price, name, quantity} }) => (
    <div className='cart-item'>
        <img src={imageUrl} alt='item' />
        <div className='item-detail'>
            <p className='name'> {name} </p>
            <p className='price'> {quantity} x ${price} </p>
        </div>
    </div>
);

export default CartItem;