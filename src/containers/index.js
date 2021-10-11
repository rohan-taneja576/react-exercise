import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [value,setValue] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(value => value + 1)
        },1000);
        return () => {
            clearInterval(interval)
        }
    },[])

    return (
        <div>
            {value}
        </div>
    )
}

export default Counter;