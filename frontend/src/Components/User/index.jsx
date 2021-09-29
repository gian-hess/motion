import { useState } from "react";
import styled from "styled-components";
import avatar from "../../assets/svgs/avatar.svg"

const Container = styled.div`
    height: 489px;
    width: 362px;
    background: #FFFFFF;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;

    img {
        height: 80px;
        width: 80px;
        margin-bottom: 10%;
    }

    .name {
        font-size: ${props => props.theme.textSizeL};
        line-height: 26px;
        margin-bottom: 2%;
    }

    .location {
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 5%;
    }
    
    .description {
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        margin-bottom: 10%;
    }

`
const Buttons = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5%;
`

const Button = styled.button`
    height: 40px;
    width: 40%;
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
`

const Hobbies = styled.div`
    height: 76px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

const Hobby = styled.p`
    height: 32px;
    width: fit-content;
    background: rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 0 10px;
    cursor: default;
    margin: 1% 1%;
`

const User = (props) => {
    const [isFollowing, setIsFollowing] = useState(props.user.logged_in_user_is_following);
    const [sentRequest, setSentRequest] = useState(props.user.logged_in_user_sent_fr);
    const [requestId, setRequestId] = useState(0);
    
    const follow = async () => {
        const url = `https://motion.propulsion-home.ch/backend/api/social/followers/toggle-follow/${props.user.id}/`;
        const token = `Bearer ${localStorage.getItem("token")}`;   
        const body = JSON.stringify(props.user)
        const config = {
            method: "POST",
            headers: new Headers({
                "Authorization": token            
            }),
            body
        }
        const response = await fetch(url, config);
        const data = await response.json();
        setIsFollowing(data.logged_in_user_is_following);  
    }

    const addFriend = async () => {
        if (!props.user.logged_in_user_is_friends) {
            if (!sentRequest){
                const url = `https://motion.propulsion-home.ch/backend/api/social/friends/request/${props.user.id}/`;
                const token = `Bearer ${localStorage.getItem("token")}`;   
                const body = JSON.stringify({requester: {}, receiver: {}})
                const config = {
                    method: "POST",
                    headers: new Headers({
                        "Authorization": token            
                    }),
                    body
                }
                const response = await fetch(url, config);
                const data = await response.json();
                setSentRequest(data.receiver.logged_in_user_sent_fr); 
                setRequestId(data.id);
            }
            else {
                const url = `https://motion.propulsion-home.ch/backend/api/social/friends/requests/${requestId}/`;
                const token = `Bearer ${localStorage.getItem("token")}`; 
                const config = {
                    method: "DELETE",
                    headers: new Headers({
                        "Authorization": token            
                    }),
                }
                const response = await fetch(url, config); 
                if (response.status >= 200 && response.status < 300) {
                    const newSentRequest = !sentRequest;
                    setSentRequest(newSentRequest); 
                    setRequestId(0);
                }  
            }
        }
    }
    
    return (
        
        <Container>
            <img src={props.user.avatar ? props.user.avatar : avatar} alt="user icon"/>
            <p className="name">{props.user.first_name ? props.user.first_name : "FirstName"} {props.user.last_name ? props.user.last_name : "LastName"}</p>
            <p className="location">{props.user.location ? props.user.location : "No location"}</p>
            <Buttons>
                <Button 
                className = { isFollowing ? "isFallowing" : "notFollowing" }
                onClick = { follow }
                >
                    { isFollowing ? "FOLLOWING" : "FOLLOW"}
                </Button>
                <Button onClick = { addFriend }>
                    { props.user.logged_in_user_is_friends ? "✓  FRIEND" : sentRequest ? "REQUEST SENT" : "ADD FRIEND" }
                </Button>
            </Buttons>
            <p className="description">{props.user.about_me ? props.user.about_me : "No description"}</p>
            <Hobbies>
                {
                props.user.things_user_likes.length 
                ? 
                props.user.things_user_likes.map((element, index) => <Hobby key={`${index}-${element}`}>{element}</Hobby>)
                : 
                <p>No hobbies</p>
                }
            </Hobbies>
        </Container>
    )
}

export default User;