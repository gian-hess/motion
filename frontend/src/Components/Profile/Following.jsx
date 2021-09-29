import Header from "../Header"
import User from "../User";
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react";
import {Main, FriendsStuff, Users, Wrapper, Buttons} from "./styled";


const Following = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.findFriendsReducer);
    const url = "https://motion.propulsion-home.ch/backend/api/social/followers/following/";
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
            <FriendsStuff>

                <Main>
                    <Wrapper>
                        <Users>
                            {users.results ? users.results.map(user => <User key={user.id} user={user}/>) : "Loading..."}
                        </Users>
                        <Buttons>
                            {users.previous ? <button onClick={() => fetchData(users.previous)}>Previous</button> : null}
                            {users.next ? <button onClick={() => fetchData(users.next)}>Next</button> : null}
                        </Buttons>
                    </Wrapper>
                </Main>
            </FriendsStuff>
        </>
    )
}

export default Following;

