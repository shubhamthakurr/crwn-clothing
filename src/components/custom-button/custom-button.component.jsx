import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, inverted,checkout, ...otherProps }) => (
    <button 
        className={`${checkout ? 'checkout' : ''} ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} 
        {...otherProps}
    >
        {children}
    </button>
);

export default CustomButton;
