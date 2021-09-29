import Masonry from 'react-masonry-css';
import "./style.css" ;
import styled from 'styled-components';
import Post from "../Post";
import React, {useEffect, useState} from 'react'

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  height: 100%;
  width: 80%;
`

const Wall = (props) => {
    const [posts, setPosts] = useState(null);

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
        fetch(props.url, myInit)
                .then(response => response.json())
                .then(postsInfo => setPosts(postsInfo))
    }, [props.url, token])

    return (
        <Content>
            <Wrapper>
                <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {posts && posts.results.map((post) => <Post deleteByID={props.deleteByID} key={post.id} post={post} me={props.first_name}/>)}
                </Masonry>
            </Wrapper>
        </Content>
    )
}
export default Wall;