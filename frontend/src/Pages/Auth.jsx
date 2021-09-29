import styled from 'styled-components';
import SocialLinks from '../Components/SocialLinks';
import { Route, Switch } from "react-router-dom"
import SignIn from './SignIn';
import SignUp from './SignUp';
import Confirmation from './Confirmation';
import Verification from './Verification';

const AuthWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
`

const Auth = () => {  
    return (
        <AuthWrapper>
            <SocialLinks />
            <Switch>
                <Route path="/login" component={ SignIn } exact/>
                <Route path="/login/signup" component={ SignUp } exact/>
                <Route path="/login/confirmation" component={ Confirmation } exact/>
                <Route path="/login/verification" component={ Verification } exact/>          
            </Switch>
        </AuthWrapper>
    )
}

export default Auth;