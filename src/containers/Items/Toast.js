import React, { useState } from 'react';

const Toast = (props) => {
    return (
        <React.Fragment>
            {props.display === true &&
                <div className="toast-container">
                    <p className="toast-text">{props.text}</p>
                </div>
            }
        </React.Fragment>
    );
};

export default Toast;
