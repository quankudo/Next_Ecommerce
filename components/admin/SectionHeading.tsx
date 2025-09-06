import React from 'react'

const SectionHeading = ({text}: {text: string}) => {
    return (
        <div className='bg-white shadow rounded p-4'>
            <h4 className='text-xl'>{text}</h4>
        </div>
    )
}

export default SectionHeading
