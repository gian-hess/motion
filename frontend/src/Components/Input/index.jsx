import React from 'react'
import styled from "styled-components"


const BaseInput = styled.input`
 
    background: none;
    padding: 10px 10px;
    border: none; 
    outline: none; 
    width: 100%;
    height: 100%;
    
    :hover {
      cursor: text;
    }

    ::placeholder { 
        color: black;
        opacity: 1; 
    }

`


const Input = ({type, name, id, value, onChange, required}) => {
    return (
        <BaseInput type={type} placeholder={name} id={id} value={value} onChange={onChange} required={required}/>        
    )
}

export default Input;
