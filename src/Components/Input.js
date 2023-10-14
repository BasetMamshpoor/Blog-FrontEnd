import React, { useEffect, useState } from 'react';

const Input = ({
    type,
    name,
    className,
    value,
    placeholder,
    min,
    result,
    refrence
}) => {
    const [val, setVal] = useState('')

    const handleChange = event => {
        setVal(event.target.value)
    }

    useEffect(() => setVal(value), [value])

    const handleBlur = () => result && result(name, val)

    return (
        <>
            <input
                ref={refrence && refrence}
                onBlur={handleBlur}
                className={className}
                name={name}
                type={type}
                onChange={handleChange}
                value={val}
                placeholder={placeholder}
                min={min && min}
            />
        </>
    );
};

export default Input;