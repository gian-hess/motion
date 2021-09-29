import styled from "styled-components"

export const LoginContainerRight = styled.div`
    height: 100vh;
    width: 60%; 
    display: flex;
    flex-direction: column;
`

export const LoginTopBar = styled.div`
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 2%;
    margin-right: 5%;

    p {
        margin: 20px;
    }
`

export const LoginMain = styled.div `
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    h1{
        font-size: 40px;
        padding: 20px;
        margin-bottom: 20px;
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

`

export const InputWrapper =styled.div`
    border-bottom: 2px solid grey;
    padding: 5px; 
    margin: 5px 0 50px 0;
    height: 50px;
    width: 500px;
    display: flex;
    align-items: center;

    img {
        width: 20px;
        height: 20px;
    }
`

export const InputsWrapper =styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

export const LoginButton = styled.button `
    background: ${props => props.theme.motionColor}; 
    border: none;
    width: 280px;
    height: 60px;
    border-radius: 30px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2%;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
    
    :hover {
        cursor: pointer;
    }

    :active {
        transform: translateY(2px);
    }
`

export const LoginWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 15%;
    justify-content: flex-end;
    align-items: center;
`

export const Main = styled.div`
    width: 100%;
    height: fit-content;
    margin-top: 80px;
    display: flex;
    background: #F2F2F2;
    justify-content: center;
    align-items: center;
`