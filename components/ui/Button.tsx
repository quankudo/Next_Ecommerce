import React from 'react'

const Button = ({isSubmit, text, isWidthFull, event}: {isSubmit?: boolean, text: string, isWidthFull?: boolean, event?:()=>void}) => {
    return (
        <button type={isSubmit ? 'submit' : 'button'} onClick={event}
            className={`px-8 py-2 bg-black text-white cursor-pointer ${isWidthFull && 'w-full'}`}>
            {text}
        </button>
    )
}

export default Button
