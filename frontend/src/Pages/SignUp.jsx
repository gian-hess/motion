import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Input from '../Components/Input';
import { InputWrapper, LoginButton, LoginContainerRight, LoginMain, LoginTopBar, StyledForm, LoginWrapper } from '../Style/container';
import emailIcon from "../assets/svgs/email.svg";
import RadioWrapper from "../Components/RadioWrapper"

const SignUpButton = styled.button `
    display: flex;
    margin: 10px;    
    background: none;
    border: 1.5px rgba(212, 208, 208, 0.619) solid;
    width: 120px;
    height: 40px;
    border-radius: 25px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px; 

    &:hover {
        cursor: pointer;
    }

    &:active {
        background-color: grey;
    }   
`
const EmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
        margin-left: 2%;
        font-size: 12px;
        opacity: 0.2;
    }
`


const SignUp = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleChangeMail = (e) => {
        setEmail(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "https://motion.propulsion-home.ch/backend/api/auth/registration/";

        const config = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                email
            })
        }
        const response = await fetch(url, config);
    
        if (response.status === 200) {
            history.push({pathname: "/login/confirmation", state: email})
        } else {
            const resData = await response.json();
            setError(true)
            setErrorMsg(resData.email[0])
            
        }
    }

    const login = () => {
        history.push("/login")
    };

    return (
        <LoginContainerRight>
            <LoginTopBar>
                <p>Already have an account?</p>
                <SignUpButton onClick={login}> SIGN IN </SignUpButton>               
            </LoginTopBar>
            <LoginMain>
                <h1>Sign Up</h1>
                <StyledForm>
                    <InputWrapper> 
                        <label htmlFor="email"><img src={emailIcon} alt="avatar"/></label>
                        <EmailWrapper>
                            <p>Email</p>
                            <Input name="Email" type="text" id='email' value={ email } onChange={ handleChangeMail } required/>
                        </EmailWrapper>
                    </InputWrapper> 
                            {error && <p style={{color: "red"}}>{errorMsg}</p>}
                    <LoginWrapper>
                        <LoginButton type='submit' onClick={handleSubmit}>CONTINUE</LoginButton>                                 
                        <RadioWrapper />
                    </LoginWrapper>
                </StyledForm>
            </LoginMain>
        </LoginContainerRight>
    )
}

export default SignUp;