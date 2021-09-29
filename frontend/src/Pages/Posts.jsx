import Header from "../Components/Header"
import Search from "../Components/Search"
import MainWall from "../Components/MainWall"
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {Main} from "../Style/container"
import {Route, Switch, useLocation} from "react-router-dom";
import Wall from "../Components/Wall";


const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Posts = () => {
    const [posts, setPosts] = useState({});
    const [firstName, setFirstName] = useState("");
    const [avatar, setAvatar] = useState("");
    const location = useLocation()

    const token = `Bearer ${localStorage.getItem("token")}`;

    useEffect(() => {
        const headers = new Headers({
            "Authorization": token,
            "Content-type": "application/json"
        }) // creating the headers


        const myInit = {
            method: 'GET',
            headers: headers
        } // putting all the information together on the object that we will pass as the second argument to the fetch function.

        fetch('https://motion.propulsion-home.ch/backend/api/social/posts/', myInit)
            .then(response => response.json())
            .then(postsInfo => setPosts(postsInfo))


        // fetch user data
        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        const config = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token
            }),
        }

        const fetchMe = async () => {
            const res = await fetch(url, config);
            const resData = await res.json();
            setFirstName(resData.first_name);
            setAvatar(resData.avatar);
        }
        fetchMe()


    }, [])

    const deleteByID = async (id) => {
        const headers = new Headers({
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        })

        const config = {
            method: "DELETE",
            headers
        }
        const url = `https://motion.propulsion-home.ch/backend/api/social/posts/${id}`;
        const res = await fetch(url, config);
    }

    const updateByID = async (id, text) => {
        console.log('id:', id)
        console.log('text:', text)

        const url = `https://motion.propulsion-home.ch/backend/api/social/posts/${id}`;
        let token = localStorage.token
        token = `Bearer ${token}`

        const config = {
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token.toString()
            }),
            body: JSON.stringify({
                content: text
            })
        }
    
        const updatePost = async () => {
        const res = await fetch(url, config);
        const resData = await res.json();
        console.log(resData)
        }

        updatePost()
    }

    return (
        <>
            <Header/>
            <Main>
                <Wrapper>
                    <Search/>
                    <Switch>
                        <Route path="/" render={() => <MainWall updateByID={updateByID} deleteByID={deleteByID} first_name={firstName} posts={posts.results} avatar={avatar}/>} exact/>
                        <Route path="/posts/" render={() => <Wall deleteByID={deleteByID}
                                                                  first_name={firstName}
                                                                  url={`https://motion.propulsion-home.ch/backend/api/social/posts/${location.search}`}/>} exact/>
                        <Route path="/posts/liked" render={() => <Wall deleteByID={deleteByID}
                                                                       first_name={firstName}
                                                                       url='https://motion.propulsion-home.ch/backend/api/social/posts/likes/'/>} exact/>
                        <Route path="/posts/friends" render={() => <Wall deleteByID={deleteByID}
                                                                         first_name={firstName}
                                                                         url='https://motion.propulsion-home.ch/backend/api/social/posts/friends/'/>} exact/>
                        <Route path="/posts/follow" render={() => <Wall deleteByID={deleteByID}
                                                                        first_name={firstName}
                                                                        url='https://motion.propulsion-home.ch/backend/api/social/posts/following/'/>} exact/>
                    </Switch>
                </Wrapper>
            </Main>
        </>
    )
}

export default Posts;

