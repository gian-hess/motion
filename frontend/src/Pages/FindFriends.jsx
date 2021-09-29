import styled from "styled-components";
import Header from "../Components/Header"
import User from "../Components/User";
import { Main } from "../Style/container";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

const Users = styled.div`
    height: 100%;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 2% 0;
`
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`
const Buttons = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    button {
        height: 40px;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;  
        margin: 0 2%;
        background: inherit;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
        border-radius: 30px;

        &.isFallowing {
            background: ${props => props.theme.motionColor};
            color: white;
            border: none;
        }
    
        :hover {
            cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }
    }
`

const FindFriends = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.findFriendsReducer);
    const url = "https://motion.propulsion-home.ch/backend/api/users/";
    const token = `Bearer ${localStorage.getItem("token")}`;   
    const config = {
      method: "GET",
      headers: new Headers({
          "Authorization": token,
      }),
    }

    const fetchData = async (url) => {
        const response = await fetch(url, config);
        const resData = await response.json();
        const action = {
            type: "getUsers",
            payload: resData
        }
        
        dispatch(action);
    }
   
    useEffect(() => fetchData(url), []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    
    return (
        <>
            <Header/>
            <Main>  
                <Wrapper>
                    <Users>
                        {users.results ? users.results.map(user => <User key={user.id} user={user}/>) : "Loading..."}
                    </Users>      
                    <Buttons>
                        { users.previous ? <button onClick={ () => fetchData(users.previous) }>Previous</button> : null }
                        { users.next ? <button onClick={ () => fetchData(users.next) }>Next</button> : null }
                    </Buttons>
                </Wrapper>
            </Main>
        </>
    )
}

export default FindFriends;