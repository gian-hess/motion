import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Input from "../Components/Input";
import RadioWrapper from "../Components/RadioWrapper";
import { InputsWrapper, InputWrapper, LoginButton, LoginContainerRight, LoginMain, LoginTopBar, LoginWrapper, StyledForm } from "../Style/container";


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
    
const ValidationWrapper = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    
    .validationCode {
        width: 100%;
    }
    
    .input {
        width: 45%;
    }
`


const Verification = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [password_repeat, setPassword2] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState([])

    const handleChangeMail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangeCode = (e) => {
        setCode(e.target.value)
    }

    const handleChangePsw = (e) => {
        setPassword(e.target.value)
    }

    const handleChangePsw2 = (e) => {
        setPassword2(e.target.value)
    }

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "https://motion.propulsion-home.ch/backend/api/auth/registration/validation/";

        const config = {
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                email,
                username,
                code,
                password,
                password_repeat,
                first_name,
                last_name,
            })
        }
        const response = await fetch(url, config);
       
        if (response.status === 200) {
            history.push("/login")
        } else {
            const resData = await response.json();
            setError(true)
            for (const [key, value] of Object.entries(resData)) {
                console.log(`${key}: ${value}`)
                setErrorMsg(`${key}: ${value}`)
            }

        }
    }

    

    return (
        <LoginContainerRight>
            <LoginTopBar>           
            </LoginTopBar>
            <LoginMain>
                <h1>Verification</h1>
                <StyledForm >
                    <InputsWrapper>
                        <ValidationWrapper> 
                            <InputWrapper className="validationCode"> 
                                <Input name="Validation code" type="text" id='validationCode' value={code} onChange={handleChangeCode} required/>
                            </InputWrapper>
                        </ValidationWrapper>
                        <ValidationWrapper>
                            <InputWrapper className="input">                        
                                <EmailWrapper>
                                    <p>Email</p> 
                                    <Input name="Email" type="text" id='email' value={email} onChange={handleChangeMail} required/>
                                </EmailWrapper>
                            </InputWrapper>
                            <InputWrapper className="input">
                                <EmailWrapper>
                                    <p>Username</p>
                                    <Input name="Username" type="text" id='username' value={username} onChange={handleChangeUsername} required/>
                                </EmailWrapper>
                            </InputWrapper>
                        </ValidationWrapper>
                        <ValidationWrapper>
                            <InputWrapper className="input"> 
                                <Input name="First name" type="text" id='firstName' value={first_name} onChange={handleChangeFirstName} required/>
                            </InputWrapper>
                            <InputWrapper className="input">
                                <Input name="Last name" type="text" id='lastName' value={last_name} onChange={handleChangeLastName}  required/>
                            </InputWrapper>                            
                        </ValidationWrapper>
                        <ValidationWrapper>
                            <InputWrapper className="input"> 
                                <Input name="Password" type="password" id='password' value={password} onChange={handleChangePsw}  required/>
                            </InputWrapper>
                            <InputWrapper className="input">
                                <Input name="Password repeat" type="password" id='passwordRepeat' value={password_repeat} onChange={handleChangePsw2}  required/>
                            </InputWrapper>                            
                        </ValidationWrapper>
                    </InputsWrapper>           
                    {error && <p style={{color: "red"}}>{errorMsg}</p>}
                    <LoginWrapper>
                        <LoginButton type='submit' onClick={handleSubmit}>COMPLETE</LoginButton>
                        <RadioWrapper />
                    </LoginWrapper>
                </StyledForm>
            </LoginMain>
        </LoginContainerRight>
    )
}

export default Verification;
