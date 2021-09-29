import React, { useEffect, useState } from 'react';
import { Main, FriendsStuff, Wrapper } from "./styled";
import ProfileWall from ".";
import Masonry from 'react-masonry-css';
import Post from "../Post";
import { useSelector } from 'react-redux';


const PersonalPosts = (props) => {
    const [posts, setPosts] = useState([]); 
    const [userId, setUserId] = useState(-1);
    
    const token = `Bearer ${localStorage.getItem("token")}`;

    useEffect(() => {
        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`

        const config = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token.toString()
            }),
        }
    
        const fetchId = async () => {
          const res = await fetch(url, config);
          const resData = await res.json();
          setUserId(resData.id)
          console.log(resData.id)
        }
        fetchId()
    }, [])


    useEffect (() => {
        console.log(props.first_name)
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
        .then(postsInfo => {
            const myPosts = []
            postsInfo.results.forEach((post) => {
                console.log(post.user.id)
                console.log(userId)
                if (post.user.id === userId) {
                    console.log('find my post')
                    myPosts.push(post);
                }

            })
            setPosts(myPosts);

        });
    }, [userId])

    console.log(posts)
  
    return (
        <>
            <FriendsStuff>
            <Main>
                <Wrapper>
                <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {
                    posts[0] ? posts.map((post) => <Post key={post.id} post={post}/>) : null
                    }
                </Masonry>
                </Wrapper>
            </Main>
            </FriendsStuff>
        </>
    )
}

export default PersonalPosts;

