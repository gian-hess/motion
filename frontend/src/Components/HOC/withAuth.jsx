import { useSelector } from "react-redux"

const withAuth = (WrapperComponent) => {
  return (props) => {
    const token = useSelector((state) => state.authReducer.userToken);
    
    if (token) {
      return <WrapperComponent />
    } else {
      props.history.push("/login");
      return null;
    }
  }
}

export default withAuth;