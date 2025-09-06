import React from 'react'

const Button = ({isSubmit, text, isWidthFull}: {isSubmit?: boolean, text: string, isWidthFull?: boolean}) => {
    return (
        <button type={isSubmit ? 'submit' : 'button'} 
            className={`px-8 py-2 bg-black text-white cursor-pointer ${isWidthFull && 'w-full'}`}>
            {text}
        </button>
    )
}

export default Button
