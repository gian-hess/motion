import { useLocation } from 'react-router';
import styled from 'styled-components';

const Radio = styled.div`
    width: 100px;
    display: flex;
    margin-top: 2%;
    justify-content: space-between;
    align-items: center;  
    
    p { 
        height: 12px;
        width: 12px;
        border: 2px black solid;
        border-radius: 50%;
    }
`
    
const RadioWrapper = () => {

    const location = useLocation();

    return (
        <Radio>
            <p style={{background: location.pathname === "/login/signup" ? "black" : null }}></p>
            <p style={{background: location.pathname === "/login/confirmation" ? "black" : null }}></p>
            <p style={{background: location.pathname === "/login/verification" ? "black" : null }}></p>
        </Radio>
    )
}

export default RadioWrapper;