import styled from "styled-components";
import avatar from "../../assets/svgs/avatar.svg";
import clockIcon from "../../assets/svgs/clockIcon.svg";

const NotificationWrapper = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5% 0;

    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 5%;
    }
    p {
        white-space: nowrap;
    }

    button {
        height: 35px;
        width: 40px;
        border-radius: 50%;
        border: none;

        :hover {
            cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }
        
        &.accept {
            background: ${props => props.theme.motionColor};
            color: white;
            
        }

        &.reject {
            background: rgba(0,0,0,0.05);
            color: rgba(0,0,0,0.3);
            margin-left: 10%;
        }
    }
`

const Wrapper = styled.div`
    height: 100%;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NotificationComponent = (props) => {
    const accept = async() => {
        const url = `https://motion.propulsion-home.ch/backend/api/social/friends/requests/${props.request.id}/`;
        const token = `Bearer ${localStorage.getItem("token")}`;   
        const body = JSON.stringify({status: "A"})
        const config = {
            method: "PATCH",
            headers: new Headers({
                "Authorization": token, 
                "Content-Type": "application/json"
            }),
            body
        }
        await fetch(url, config);
    }

    const reject = async() => {
        const url = `https://motion.propulsion-home.ch/backend/api/social/friends/requests/${props.request.id}/`;
        const token = `Bearer ${localStorage.getItem("token")}`;   
        const body = JSON.stringify({status: "R"})
        const config = {
            method: "PATCH",
            headers: new Headers({
                "Authorization": token,
                "Content-Type": "application/json"          
            }),
            body
        }
        await fetch(url, config);      
    }


    return (
        props.request.status !== "P"
        ?
        null
        :
        <NotificationWrapper>
            {             
            props.request.requester.id === parseInt(localStorage.id)
            ?
            <> 
            <Wrapper>
                <img src={props.request.receiver.avatar ? props.request.receiver.avatar : avatar} alt="user icon"/>
                <p>{props.request.receiver.first_name ? props.request.receiver.first_name : "FirstName"} {props.request.receiver.last_name ? props.request.receiver.last_name : "LastName"}</p>
            </Wrapper>
            <Wrapper>
                <img src={clockIcon} alt="clockIcon"/>
            </Wrapper>
            </>
            :
            <>  
                <Wrapper>
                    <img src={props.request.requester.avatar ? props.request.requester.avatar : avatar} alt="user icon"/>
                    <p>{props.request.requester.first_name ? props.request.requester.first_name : "FirstName"} {props.request.requester.last_name ? props.request.requester.last_name : "LastName"}</p>
                </Wrapper>
                <Wrapper>
                    <button className="accept" onClick={accept}>✓</button>
                    <button className="reject" onClick={reject}>X</button>
                </Wrapper>
            </>
            }
        </NotificationWrapper>   
    )
}

export default NotificationComponent