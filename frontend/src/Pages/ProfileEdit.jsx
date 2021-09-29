import Header from "../Components/Header";
import { EditBoxLeft, EditBoxRight, ProfileEditBox } from "../Components/Profile/EditStyled";
import { BackgroundImg } from "../Components/Profile/styled";
import { InputWrapper, Main } from "../Style/container";
import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from 'react-redux';


const ThingsILikeContainer = styled.div`  
    display: flex;
    flex-direction: column;

    p{
        margin-bottom: 20px;
    }
    #removeThingUserLikes{
        border: none;
        margin-left: 10px;
        width: 5px;
        height: 5px;
        cursor: pointer;
    }

`

const ThingsILike = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-items: start;
    align-items: space-between;
    height: 100px;

    .thingILike {    
        border: none; 
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        margin: 5px;
        padding: 8px 15px 8px 15px;
        width: max-content;
        height: max-content;
        font-size: 12px;
        background-color: rgba(240, 241, 242);    
    }
`

const TypeSomethingAdd = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    height: 40px;
    border-bottom: 2px solid grey;


    input{
        border: none;
        padding: 0px 0px 10px 0px;
    }

    button{
        padding: 10px 30px 10px 30px;
        text-align: center;
        border-radius: 25px;
        border: #a8a6a6; 
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        background-color: white;
        cursor: pointer;
    }


`


const EmailWrapper = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;

        p {
            margin-left: 2%;
            font-size: 12px;
            opacity: 0.2;
        }    
`
    
const ValidationWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    color: black;
       
    .input {
        width: 45%; 
    }

    .hobby {
        width: 80%;
    }

    

    button {
        height: 40px;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;  
        margin-left: 10%;
        background: inherit;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
        border-radius: 30px;
    
        :hover {
            cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }
    }
`



const Banner = styled.div`
    background-image: url(${(props) => props.banner});
    position: absolute;
    width: 100%;
    height: 320px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    img {
        width:20px;
        height:40px;
    }
`


const ProfileEdit = () => {

    const dispatch = useDispatch();
    let fileRefBanner = React.createRef();  


    const [isOpen, setIsOpen] = useState(false)
    //const [userData, setUserData] = useState({});


    const [userName,setUserName] = useState("");    
    const [firstName,setFirstName] = useState(""); 
    const [lastName,setLastName] = useState(""); 
    const [email,setEmail] = useState("");
    const [location,setLocation] = useState("");
    const [about,setAbout] = useState("");
    const [thingsUserLikes,setThingsUserLikes] = useState([]);
    const [avatar,setAvatar] = useState("");
    const [banner,setBanner] = useState("");    
    const [currentThingUserLikes,setCurrentThingUserLikes] = useState("");
    const [showUploadAndRemove,setShowUploadAndRemove] = useState(false);
    const [showChangesSaved, setShowChangesSaved] = useState(false);
    const [showDeleteButtonText, setShowDeleteButtonText] = useState(false);


    const history = useHistory();

    const changeFirstNameHandler = e => {
        setFirstName(e.target.value);        
    } 

    const changeLastNameHandler = e => {
        setLastName(e.target.value);        
    } 

    const changeUserNameHandler = e => {
        setUserName(e.target.value);        
    } 

    const changeEmailHandler = e => {
        setEmail(e.target.value);        
    } 

    const changeLocationHandler = e => {
        setLocation(e.target.value);        
    } 

    const changeAboutHandler = e => {
        setAbout(e.target.value);
    }

    const currentThingUserLikesHandler = e => {
        setCurrentThingUserLikes(e.target.value);
        //console.log(currentThingUserLikes);
    }

    const addCurrentThingUserLikesHandler = () => {
        setThingsUserLikes([...thingsUserLikes,currentThingUserLikes]);
        setCurrentThingUserLikes("");
    } 

    const removeThingUserLikesHandler = activityToBeRemoved => {
        setThingsUserLikes(thingsUserLikes.filter(activity=>activity!==activityToBeRemoved));

    }
    
    const updateBackgroundHandler = e => {
        const bannerRef = fileRefBanner.current.files[0];
        //console.log(bannerRef);
        const bannerURL = URL.createObjectURL(bannerRef);
        console.log('update banner', bannerURL);
        setBanner(bannerURL);

        const formData = new FormData();
        const banner = e.target.files[0];
        //console.log(banner);
        formData.append('banner', banner);
        formData.append('comment', "new banner");
        const headers = new Headers({"Authorization":`Bearer ${localStorage.getItem("token")}`});
        const config = {
            headers,
            method: 'PATCH',
            body: formData
        }        
        fetch('https://motion.propulsion-home.ch/backend/api/users/me/', config).then(data => data.json());
        
    }

    const openImageSelector = () => {
        fileRefBanner.current.click();        
    }
   
    const avatarHandler = async (e) => {

        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`
        console.log(e)

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        const config = {
            method: "PATCH",
            headers: new Headers({
                "Authorization": token.toString()
            }),
            body: formData,
        }

        const res = await fetch(url, config);
        const resData = await res.json();
        setAvatar(resData.avatar);
        localStorage.setItem('profilePic', resData.avatar)
    }



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
    
        const fetchUsers = async () => {
          const res = await fetch(url, config);
          const resData = await res.json();
          setUserName(resData.username);
          setFirstName(resData.first_name);
          setLastName(resData.last_name);
          setEmail(resData.email);
          setLocation(resData.location);
          setAbout(resData.about_me);
          setThingsUserLikes(resData.things_user_likes);
          setAvatar(resData.avatar);
          setBanner(resData.banner);
        }
        fetchUsers()
    }, [])

    const open = () => {
        setIsOpen(!isOpen)
    }

    const onSubmitHandler = () => {

        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`

        const config = {
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token.toString()
            }),
            body: JSON.stringify({
                email: email,
                first_name : firstName,
                last_name : lastName,
                username : userName,
                location: location,
                about_me: about,
                things_user_likes: thingsUserLikes
            })
        }
    
        const fetchUsers = async () => {
        const res = await fetch(url, config);
        const resData = await res.json();
        
        // save user data in react state
        // setUserData(resData)
        setUserName(resData.username);
        setFirstName(resData.first_name);
        setLastName(resData.last_name);
        setEmail(resData.email);
        setLocation(resData.location);
        setAbout(resData.about_me);



        //save user data to redux state
        const action = {
        type: 'userData',
        payload: resData
        }

        dispatch(action);


        }

        fetchUsers()
        history.push('./profile');
    }

    const onDelete = () => {
        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`

        const config = {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token.toString()
            }),
        }

        const fetchUsers = async () => {
            const res = await fetch(url, config);
            const resData = await res.json();
        }

        fetchUsers()
        history.push('./login')
    }

    

    return (
        <>
            <Header />
            <Banner banner={banner}>
                <img onClick={openImageSelector} src="http://simpleicon.com/wp-content/uploads/camera.svg" alt="camera"/>
                <p onClick={openImageSelector} >Update Image</p>
            </Banner>
            <ProfileEditBox>
                <EditBoxLeft>                  
                    <input name="updateBackgroundInput"  hidden type="file" accept="image/png, image/jpeg"  ref={fileRefBanner} onChange={updateBackgroundHandler} id="updateBackgroundInput" />
                    <div className='editTopLeft'>
                        <img src={avatar} alt='profile'/>
                        <button onClick={open} className='whiteButton'>UPDATE IMAGE</button>
                        {isOpen && <div className='popup'>
                            <label htmlFor='file-upload' className='fileUpload'>Upload file</label>
                            <input id='file-upload' type='file' className='fileInput' onChange={avatarHandler}/>
                            <button className='whiteButton' >Remove</button>
                        </div>
                        }
                    </div>
                    <div className='editBottomLeft'>
                        <button onClick={onDelete} className='whiteButton'>DELETE ACCOUNT</button>
                        <button onClick={onSubmitHandler} className='saveButton'>SAVE</button>
                    </div>
                </EditBoxLeft>
                <EditBoxRight>
                    <ValidationWrapper>
                        <InputWrapper className="input">                        
                            <EmailWrapper>
                                <p>First Name</p> 
                                <Input name="firstName" type="text" id='firstName' value={firstName} onChange={changeFirstNameHandler}/>
                            </EmailWrapper>
                        </InputWrapper>
                        <InputWrapper className="input">
                            <EmailWrapper>
                                <p>Last Name</p>
                                <Input name="lastName" type="text" id='lastName' value={lastName} onChange={changeLastNameHandler}/>
                            </EmailWrapper>
                        </InputWrapper>
                    </ValidationWrapper>
                    <ValidationWrapper>
                        <InputWrapper className="input">                        
                            <EmailWrapper>
                                <p>Email</p> 
                                <Input name="Email" type="text" id='email' value={email} onChange={changeEmailHandler} />
                            </EmailWrapper>
                        </InputWrapper>
                        <InputWrapper className="input">
                            <EmailWrapper>
                                <p>Username</p>
                                <Input name="Username" type="text" id='username' value={userName} onChange={changeUserNameHandler} />
                            </EmailWrapper>
                        </InputWrapper>
                    </ValidationWrapper>
                    <ValidationWrapper>
                        <InputWrapper className="input">                        
                            <EmailWrapper>
                                <p>Location</p> 
                                <Input name="Location" type="text" id='location' value={location} onChange={changeLocationHandler} />
                            </EmailWrapper>
                        </InputWrapper>
                        <InputWrapper className="input">
                            <EmailWrapper>
                                <p>Phone</p>
                                <Input name="123-456-7890" type="text" id='phone' readOnly/>
                            </EmailWrapper>
                        </InputWrapper>
                    </ValidationWrapper>
                    <ValidationWrapper>
                        <InputWrapper className="input">                        
                            <EmailWrapper>
                                <p>About me</p> 
                                <Input name="About me" type="text" id='aboutMe' value={about} onChange={changeAboutHandler} />
                            </EmailWrapper>
                        </InputWrapper>
                        <InputWrapper className="input">
                            <EmailWrapper>
                                <p>Password</p>
                                <Input name="Password" type="password" id='password'/>
                            </EmailWrapper>
                        </InputWrapper>                            
                    </ValidationWrapper>
                    <ThingsILikeContainer>
                        <p>Things I like!!!</p>
                        <ThingsILike>
                            {(thingsUserLikes && thingsUserLikes.length!==0)?
                            thingsUserLikes.map(activity => <div className="thingILike" key={activity+Math.random()*100000000}>{activity}<button onClick={()=>removeThingUserLikesHandler(activity)} id="removeThingUserLikes">X</button></div>)
                            :null}
                        </ThingsILike>
                        <TypeSomethingAdd>
                            <input onChange={currentThingUserLikesHandler} maxLength="20" value={currentThingUserLikes} type="text" placeholder="Type something.."></input>
                            <button onClick={addCurrentThingUserLikesHandler}>ADD</button>
                        </TypeSomethingAdd>
                    </ThingsILikeContainer>
                </EditBoxRight>
            </ProfileEditBox>
        </>
    )
}

export default ProfileEdit;