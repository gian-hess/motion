import styled from 'styled-components';
import Input from '../Components/Input';
import avatar from "../assets/svgs/avatar.svg"
import passwordIcon from "../assets/svgs/passwordIcon.svg"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginContainerRight, LoginTopBar, LoginMain, InputWrapper, StyledForm, LoginButton, InputsWrapper, LoginWrapper } from '../Style/container';
import { useHistory } from 'react-router';


const SignUpButton= styled.button `
    display: flex; 
    background: none;
    border: 1.5px rgba(212, 208, 208, 0.619) solid;
    width: 120px;
    height: 40px;
    border-radius: 25px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }

    &:active {
        background-color: grey;
    }   
`
const SignIn = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleChangeMail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePsw = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "https://motion.propulsion-home.ch/backend/api/auth/token/";

        const config = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                email,
                password
            })
        }
        const response = await fetch(url, config);
        const resData = await response.json();

        const action = {
            type: 'auth/login',
            payload: resData
        }

        dispatch(action);

        console.log(resData)

        localStorage.setItem("token", resData.access);
        localStorage.setItem("profilePic", resData.user.avatar)
        localStorage.setItem("id", resData.user.id)

        if (response.status === 200) {
            history.push("/")
        } else {
            setError(true)
            setErrorMsg(resData.detail)            
        }

    }

    const goToSignup = () => {
        history.push("/login/signup")
    }

    return (
        <LoginContainerRight>
            <LoginTopBar>
                <p>Don`t have an account?</p>
                <SignUpButton onClick={goToSignup}> SIGN UP </SignUpButton>               
            </LoginTopBar>
            <LoginMain>
                <h1>Sign In</h1>
                <StyledForm onSubmit={handleSubmit}>
                    <InputsWrapper>
                        <InputWrapper> 
                            <label htmlFor="Email"><img src={avatar} alt="avatar"/></label>
                            <Input name="Email" type="text" id='Email' value={ email } onChange={ handleChangeMail } required/>
                        </InputWrapper>
                        <InputWrapper>                        
                            <label htmlFor="password"><img src={passwordIcon} alt="passwordIcon"/></label>
                            <Input name="Password" type="Password" id='password' value={ password } onChange={ handleChangePsw } required/>
                        </InputWrapper>
                    </InputsWrapper>
                    {error && <p style={{color: "red"}}>{errorMsg}</p>}
                    <LoginWrapper>
                        <LoginButton type='submit'>SIGN IN</LoginButton>
                    </LoginWrapper>
                </StyledForm>
            </LoginMain>
        </LoginContainerRight>
    )
}

export default SignIn;