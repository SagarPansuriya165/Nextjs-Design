import React from 'react'

function EButton(props) {
    return (
        <div>
            <button text="Some button text" onClick={props.event} type='submit' className="mb-5 group relative flex justify-center rounded  bg-pink-500 py-2 px-4 text-sm font-medium text-white hover:bg-pink-600 " style={props.styles}>
                {props.children} </button>
        </div>
    );
};
export default EButton;
