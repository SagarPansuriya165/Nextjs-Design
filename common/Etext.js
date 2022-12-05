import React from 'react'

function Etext(props) {

    const getStyle = () => {
        if (props.variant === 'h1') {
            return {
                fontSize: '18px', fontWeight: 'bold'
            }
        }
    }

    return (
        <div>
            <text className="font-bold" style={{ ...getStyle(), color: props.color || '#000000' }}>{props.children}</text>
        </div>
    );
};
export default Etext;
