import Masonry from 'react-masonry-css';
import "../MainWall/style.css" ;
import send_button from "../../assets/svgs/send_button.svg";
import styled from 'styled-components';
import Post from "../Post";
import Popup from 'reactjs-popup';
import PopupPost from "../PopupPost"
import React, {useState} from 'react'
import avatar from '../../assets/svgs/avatar.svg';

const Wall = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

`
const LeftWall = styled.div`
  height: 100%;
  width: 80%;
  /*  margin-right: 15px; */
`
const CreateNewPost = styled.div`
  background-color: white;
  box-shadow: -2px 0 24px 4px rgba(0, 0, 0, 0.12);
  height: 100px;
  display: flex;

  border-radius: 5px;
  margin-top: 30px;

  .profile {
    height: 50px;
    width: 50px;
    border-radius: 30px;
    display: flex;
    align-self: center;
    margin-left: 20px;
    margin-right: 20px;
  }


  button {
    background: ${props => props.theme.motionColor};
    opacity: 0.7;
    border-radius: 30px;
    width: 55px;
    height: 55px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    padding-left: 5px;
    margin-right: 20px;


    :hover {
      cursor: pointer;
    }

    :active {
      transform: translateY(2px);
    }

    img {
      width: 50px;
      margin-right: 30px;
      margin-left: 25px;
    }

  }

  input {
    padding: 10px 10px;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;

    :hover {
      cursor: text;
    }

    ::placeholder {
      color: black;
      opacity: 1;
    }
  }
`

const MainWall = (props) => {

    const [postText, setPostText] = useState('');

    const postInputHandler = (event) => {
        setPostText(event.target.value);
    }

    return (
        <Wall>
            <LeftWall>
                <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">

                    <CreateNewPost>
                        <img className='profile' src={localStorage.profilePic === "null" ? avatar : localStorage.profilePic} alt='profile'/>
                        <input onChange={postInputHandler} value={postText} type="text" placeholder={`What's on your mind, ${props.first_name}?`}/>
                        <Popup
                            trigger={<button><img src={send_button} alt='send'/></button>}
                            modal
                            nested
                        >
                            {
                                close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>

                                    </div>
                                )
                            }
                            <span>
                                        <PopupPost initialText={postText} avatar={props.avatar} first_name={props.first_name}></PopupPost>
                                </span>
                        </Popup>
                    </CreateNewPost>
                    {props.posts && props.posts.map((post) => <Post updateByID={props.updateByID} deleteByID={props.deleteByID} key={post.id} post={post} me={props.first_name}/>)}
                </Masonry>
            </LeftWall>
        </Wall>
    )
}
export default MainWall; 

