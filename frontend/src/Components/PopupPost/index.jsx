import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import Send from '../../assets/images/send_button.png';
import ImageIcon from '../../assets/svgs/gallery.svg';
import FileIcon from '../../assets/svgs/upload.svg';
import avatar from '../../assets/svgs/avatar.svg';


const BiggerContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
background: #00000096;

` 

const NewPostContainer = styled.div`
    position: relative;
    height: 406px;
    width: 560px;
    color: black;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: white;
    box-shadow: -2px 0px 24px 4px #0000008b;
` 

const NewPostTopContainer = styled.div`
    height: 166px;
    margin-top: 40px;
    margin-left: 25px;
    margin-right: 30px;
    display: flex;
    align-items: flex-start;

    img{
            height: 80px;
            width: 80px;
            border-radius: 40px;
            margin-bottom: 24px;
        }
` 

const NewPostMiddleContainer = styled.div`
    height: 144px;
    display: flex;
    align-items: center;
    margin-left: 80px;
    margin-right: 80px;
    color: black;
    overflow: auto;
    resize: none;
` 

const PreviewImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin: 10px;


    background-image: url(${props => props.preview});
    background-repeat: no-repeat;
    background-size: contain;


    color: black;
    height: 100%;

    p {
        margin-bottom: 20px;
    }

` 

const NewPostBottomContainer = styled.div`
    height: 106px;
    display: flex;
    align-items: center;
    border-top: 1px solid lightgray;
` 


const PostButton= styled.button `
    background: ${props => props.theme.motionColor}; 
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px; 
    margin-left: auto;
    opacity: 0.6;
    
    &:hover {
        cursor: pointer;
        opacity: 1;
    }

    &:active {
        transform: translateY(4px);
    }
`

const AddFilesButton= styled.button `
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 33px; 
    opacity: 0.6;
    background-color: white;
    
    &:hover {
        cursor: pointer;
        opacity: 1;
    }

    &:active {
        transform: translateY(4px);
    }
`

const DeleteFileButton= styled.button `
    border-radius: 100%;
    width: 20px;
    height: 20px;

    
    &:hover {
        cursor: pointer;
        opacity: 1;
    }

    &:active {
        transform: translateY(1px);
    }
`

const PostInput = styled.textarea`
    color: black;
    font-size: ${props => props.theme.textSizeM}; ;
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    margin-left: 25px;

    :hover {
        cursor: text;
    }
`

const NewPost = (props) => {

    const inputCursor = useRef(null)


    useEffect (() => {
        // hack to move the cursor to the end of the text
        inputCursor.current.setSelectionRange(postText.length, postText.length)
    }, [])

    const [postPic, setPostPic] = useState([]);
    const [postText, setPostText] = useState(props.initialText);
    const dispatch = useDispatch();

    const handlePostPic = (e) => {
        const postPicArray = [...postPic];
        for (let pic of e.target.files) {
            // add pic url to display preview
            pic.url = URL.createObjectURL(pic);
            // prevent reupload
            if (!postPicArray.some(function(o){return o['name'] === pic.name;})) {
                postPicArray.push(pic);
            }
        }
        setPostPic(postPicArray);
        e.target.value = null
    }


    const postInputHandler = (event) => {        
        setPostText(event.target.value);
    }

    const handleNewPost = async (e) => {
        e.preventDefault();

        // dispatch action
        const headers = new Headers({
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        })
    
        const formData = new FormData();
        postPic.map(pic => formData.append("images", pic));
        formData.append("content", postText);
    
        const config = {
            method: "POST",
            headers,
            body: formData
        }
        
        const res = await fetch('https://motion.propulsion-home.ch/backend/api/social/posts/', config);
        const resData = await res.json();
    
        const action = {
            type: 'CREATE_POST',
            payload: resData
        };
    
        dispatch(action);

        // reset local react state
        setPostText('');
        setPostPic([]);

    }

    const realFileInput = React.useRef(null);

    const replaceFileInput = (e) => {
        realFileInput.current.click()
    }

    const deleteFile = (e) => {

        const files = postPic.filter(file => {
            return file.name !== e.target.name             
        });
        setPostPic(files);
    }


    return (
        <BiggerContainer>
        <NewPostContainer>
            <NewPostTopContainer>
                <img src={props.avatar ? props.avatar : avatar} alt='profile'/>
                <PostInput ref={inputCursor} onChange={postInputHandler} value={postText} type="text" placeholder={`What’s on your mind, ${props.first_name}?`}></PostInput>
            </NewPostTopContainer>
            <NewPostMiddleContainer>
                {
                    postPic.map((file, index) => {
                        return(
                            <PreviewImage key={index} preview={file.url}>
                                <DeleteFileButton name={file.name} onClick={deleteFile}>x</DeleteFileButton>
                                <p>{file.name}</p>
                            </PreviewImage>
                        )
                    })
                }                
            </NewPostMiddleContainer>
            <NewPostBottomContainer>
                <input type="file" style={{display: "none"}} ref={realFileInput} onChange={e => handlePostPic(e)} accept="image/png, image/jpeg" multiple/>
                <AddFilesButton onClick={e => replaceFileInput(e)}><img src={ImageIcon} alt='img icon'/></AddFilesButton>
                <AddFilesButton onClick={e => replaceFileInput(e)}><img src={FileIcon} alt='file icon'/></AddFilesButton>
                <PostButton onClick={e => handleNewPost(e)}><img src={Send} alt='send button'/></PostButton>
            </NewPostBottomContainer>
        </NewPostContainer>
        </BiggerContainer>
    )
}
export default NewPost