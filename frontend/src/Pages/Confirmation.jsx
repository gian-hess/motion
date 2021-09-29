import { useHistory } from "react-router";
import styled from "styled-components";
import RadioWrapper from "../Components/RadioWrapper";
import { LoginButton, LoginContainerRight, LoginMain, LoginTopBar, LoginWrapper, StyledForm } from "../Style/container";



const Confirm = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;        
    }

    .check {
        height: 81px;
        width: 81px;
        border: 4px solid #A580FF;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
        color: #A580FF;
        border-radius: 50%;
        margin-bottom: 10%;
        font-size: ${props => props.theme.textSizeXXL};
    }
`

const Confirmation = (props) => {
    const history = useHistory();

    const verification = () => {
        history.push("/login/verification")
    };

    return (
        <LoginContainerRight>
            <LoginTopBar>           
            </LoginTopBar>
            <LoginMain>
                <h1>Congratulations!</h1>
                <StyledForm >
                    <Confirm>
                        <p className="check">✓</p>
                        <p>We’ve sent a confirmation code to your email {props.location.state}</p> 
                    </Confirm>
                    <LoginWrapper>
                        <LoginButton type='submit' onClick={verification}>CONTINUE</LoginButton>
                        <RadioWrapper />
                    </LoginWrapper>        
                </StyledForm>
            </LoginMain>
        </LoginContainerRight>
    )
}

export default Confirmation;
