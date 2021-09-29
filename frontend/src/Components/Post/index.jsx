import menu from "../../assets/svgs/menu.svg"
import heart from "../../assets/svgs/heart.svg"
import share from "../../assets/svgs/share.svg"
import styled from 'styled-components';
import moment from 'moment';
import Popup from "reactjs-popup"; 
import avatar from "../../assets/svgs/avatar.svg"; 
import edit from "../../assets/svgs/edit.svg"; 
import garbage from "../../assets/svgs/garbage.svg" ; 
import React, { useEffect, useState } from "react";
import EmptyHeart from '../../assets/svgs/empty_heart.svg';
import PurpleHeart from '../../assets/svgs/purple_heart.svg';


const PostContainer = styled.div `
    background-color: white;
    box-shadow: -2px 0px 24px 4px rgba(0,0,0,0.12);
    margin-top: 24px; 
    border-radius: 5px;

    p {
        margin-right: 20px;
        margin-left: 30px;
        margin-top: 10px;
        margin-bottom: 15px;
        font-size: 13px;
        line-height: 21px;
        word-wrap: break-word;
    }
`

const Comment = styled.div `
    display: flex;
    padding-top: 15px;
`

const ImgWrapper = styled.div `

    img {
            width: 40px;
            height: 40px;
            margin-right: 20px;
            margin-left: 25px;
        }

`
const NameTime = styled.div `

    display: flex;
    flex-direction: row;
    
    h5 {
        font-size: 12px;
        flex-direction: column; 
        }

    p {
        font-size: 12px;
        color: rgb(119, 119, 119);
        margin: 0;
        flex-direction: column; 
    }
`

const MenuContainer = styled.div `

    margin-left: auto;
    margin-right: 10px;

    img {
        height: 15px;
    }
    :hover {
                cursor: pointer;
            }

`

const ModalBackground= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: #00000096;
` 

const DeleteContainer = styled.div`
    position: relative;
    height: 300px;
    width: 500px;
    color: black;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: white;
    box-shadow: -2px 0px 24px 4px #0000008b;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .editBottomLeft{

        width: 100%;
        display: flex;
        justify-content: center;



        .saveButton{
            background: ${props => props.theme.motionColor}; 
            height: 48px;
            width: 150px;
            border-radius: 30px;
            border: 1px solid #00000028;
            color: white;
            margin: 10px;
            
            :hover {
                cursor: pointer;
            }
            
            :active {
                transform: translateY(2px);
            }

            font-size: 10px;
            line-height: 12px;
            letter-spacing: 0.833333px;
        }
        .whiteButton{
            height: 48px;
            width: 150px;
            border-radius: 30px;
            border: 1px solid #00000028;
            color: black;
            margin: 10px;

            
            :hover {
                cursor: pointer;
            }
            
            :active {
                transform: translateY(2px);
            }

            font-size: 10px;
            line-height: 12px;
            letter-spacing: 0.833333px;
        }
    }
    
`  

const EditContainer = styled.div`
    position: relative;
    width: 500px;
    color: black;
    box-sizing: border-box;
    background: white;
    box-shadow: -2px 0px 24px 4px #0000008b;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 15px;

    .editBottomLeft{

        width: 100%;
        display: flex;
        justify-content: center;



        .saveButton{
            background: ${props => props.theme.motionColor}; 
            height: 48px;
            width: 150px;
            border-radius: 30px;
            border: 1px solid #00000028;
            color: white;
            margin: 10px;
            
            :hover {
                cursor: pointer;
            }
            
            :active {
                transform: translateY(2px);
            }

            font-size: 10px;
            line-height: 12px;
            letter-spacing: 0.833333px;
        }
        .whiteButton{
            height: 48px;
            width: 150px;
            border-radius: 30px;
            border: 1px solid #00000028;
            color: black;
            margin: 10px;

            
            :hover {
                cursor: pointer;
            }
            
            :active {
                transform: translateY(2px);
            }

            font-size: 10px;
            line-height: 12px;
            letter-spacing: 0.833333px;
        }
    }
    
`

const PostDetail = styled.div`
    color: black;
    font-size: ${props => props.theme.textSizeM}; ;
    width: 50%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    textarea {
        color: black;
        font-size: ${props => props.theme.textSizeM}; ;
        border: none;
        outline: none;
        resize: none;
        :hover {
            cursor: text;
        }
        height: auto;
    }  
    .saveButton{
            background: ${props => props.theme.motionColor}; 
            height: 48px;
            width: 150px;
            border-radius: 30px;
            border: 1px solid #00000028;
            color: white;
            margin: 10px;
            
            :hover {
                cursor: pointer;
            }
            
            :active {
                transform: translateY(2px);
            }

            font-size: 10px;
            line-height: 12px;
            letter-spacing: 0.833333px;
        } 
`
const UserWrapper = styled.div`
    display: flex;
    flex-direction: row;
    img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
    }

    margin-bottom: 10px;
`

const Posted = styled.div`
    h5 {
        font-size: 12px;
        flex-direction: column; 
        }

    p {
        font-size: 12px;
        color: rgb(119, 119, 119);
        margin: 0;
        flex-direction: column; 
    }
`

const ImgDetail = styled.div`
    color: black;
    font-size: ${props => props.theme.textSizeM}; ;
    border: none;
    width: 50%;
    height: 100%;

    margin-right: 20px;
`


const FeedPic = styled.div `

    display: grid;
    grid-gap: 1em;

    img {
        width: 100%;
    }      
`

const EditandDelete = styled.div `
    width: 200px;
    height: 80px;
    border-radius: 5px;
    background-color: white;
    box-shadow: -2px 0px 24px 4px rgba(0,0,0,0.12);

        p {
            color:black; 
            font-size: 13px;
            margin: 0;
            flex-direction: column; 

            :hover {
                cursor: pointer;
                background-color: whitesmoke;
            }

        }

        img {
            margin-top: 15px;
            margin-bottom: 0px;
            margin-left: 20px;
            margin-right: 20px; 
            font-size: 12px;
            


            :hover {
                cursor: pointer;
            }

        
        }
`
const LikeShare = styled.div `

        display: flex;
        justify-content: center;
        align-content: center;



        button {
            font-size: 12px; 
            border: none; 
            background-color: transparent;
            margin-right: 10px;
            margin-left: 10px;

            :hover {
            cursor: pointer;
            }

            :active {
            transform: translateY(2px);
            }

            img {
                margin-right: 10px;
            }
        }

        p {
            margin-left: auto;
            margin-right: 10px;
            font-size: 12px;
            color: rgb(119, 119, 119); 
        }
`

const  Post = (props) => {

    const [loggedInUserLiked, setLoggedInUserLiked] = useState(props.post.logged_in_user_liked);
    const [amountOfLikes, setAmountOfLikes] = useState(props.post.amount_of_likes);
    const [postText, setPostText] = useState(props.initialText);


    const postInputHandler = (event) => {        
        setPostText(event.target.value);
    }

    const likePostHandler = async (e) => {
        e.preventDefault();

        if (props.post.is_from_logged_in_user) return null;

        // fetch like post
        const headers = new Headers({
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        })
    
        const config = {
            method: "POST",
            headers,
        }
    
        const url = `https://motion.propulsion-home.ch/backend/api/social/posts/toggle-like/${props.post.id}/`
        
        const res = await fetch(url, config);
        const resData = await res.json();
        console.log(resData)

        // update the UI 

        loggedInUserLiked ? setAmountOfLikes(amountOfLikes-1) : setAmountOfLikes(amountOfLikes+1);

        setLoggedInUserLiked(!loggedInUserLiked);
    }

    return ( 
    <PostContainer>
        <Comment>
            <ImgWrapper>
                <img src={props.post.user.avatar ? props.post.user.avatar : avatar} alt="avatar"/>
            </ImgWrapper>
            <NameTime>
                <h5>{props.post.user.username}</h5>
                <p>{moment(props.post.created).calendar()}</p>
            </NameTime>
            {(props.post.user.first_name === props.me) &&
            <Popup trigger={() => (<MenuContainer><img src={menu} alt="menu"/></MenuContainer>)} 
            position={"right center"}
            closeOnDocumentClick={false}
            > 
                <EditandDelete>
                    <Popup trigger={<p><img src={edit} alt='garbage'/>Edit</p>} modal nested>
                    {close => (
                        <ModalBackground> 
                            <EditContainer>
                                <ImgDetail>
                                {   
                                    props.post.images.length !== 0 &&     
                                    <FeedPic>
                                        {props.post.images.map((img,index) => <img key={`${index}-${img}`} src= {img.image} alt="post"/>)}
                                    </FeedPic>
                                }
                                </ImgDetail>
                                <PostDetail>
                                    <UserWrapper>
                                        <img src={props.post.user.avatar ? props.post.user.avatar : avatar} alt="avatar"/>
                                        <Posted>
                                            <h5>{props.post.user.username}</h5>
                                            <p>{moment(props.post.created).calendar()}</p>
                                        </Posted>
                                    </UserWrapper>
                                    <textarea onChange={postInputHandler} value={postText} type="text" placeholder={`What’s on your mind, ${props.post.user.first_name}?`}></textarea>
                                    <button onClick={() => {
                                        props.updateByID(props.post.id, postText)
                                        close()
                                        }} className='saveButton'>SAVE</button>                                
                                </PostDetail>
                            </EditContainer>
                        </ModalBackground>)}
                    </Popup>
                    <Popup trigger={<p><img src={garbage} alt='garbage'/>Delete</p>} modal nested>
                    {close => (
                        <ModalBackground> 
                            <DeleteContainer>
                                <img id='circle-icon' src={garbage} alt='garbage'/>
                                Are you sure you want to do this?
                                <div className='editBottomLeft'>
                                    <button onClick={() => {close()}} className='whiteButton'>NO</button>
                                    <button onClick={() => {
                                        props.deleteByID(props.post.id)
                                        close()
                                        }} className='saveButton'>YES</button>
                                </div>
                            </DeleteContainer>
                        </ModalBackground>)}
                    </Popup>
                </EditandDelete>
            </Popup>
            }

        </Comment>
        <p>{props.post.content}</p>
        {
            props.post.images.length !== 0 &&     
        <FeedPic>
            {props.post.images.map((img,index) => <img key={`${index}-${img}`} src= {img.image} alt="post"/>)}
        </FeedPic>
        }
        <LikeShare>                                    
                <button onClick={likePostHandler}><img src={loggedInUserLiked ? PurpleHeart : heart}  alt= "heart_icon"/>Like</button>

                <button><img src={ share } alt="share_icon"/>Share</button>
                <p>{amountOfLikes} {amountOfLikes > 1 ? 'likes' : 'like' }</p>
        </LikeShare>
    </PostContainer>)
}

export default Post; 

