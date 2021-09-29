import {Link, useHistory, useLocation} from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import posts_logo from "../../assets/svgs/posts_logo.svg";
import posts_logo_grey from "../../assets/svgs/posts_logo_grey.svg";
import icon_friends from "../../assets/svgs/icon-friends.svg";
import icon_friends_grey from "../../assets/svgs/icon-friends-grey.svg";
import notification from "../../assets/svgs/notification_bell.svg";
import avatar from "../../assets/svgs/avatar.svg";
import menuIcon from "../../assets/svgs/menu.svg";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NotificationComponent from "../Notification";


const NavBar = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
`

const Left = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;

  a {
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;

    img {
      margin-right: 15px;
    }
  }

  .navHome {
    margin-left: 5%;
    font-size: ${props => props.theme.textSizeL};
  }

  .navPosts {
    margin-left: 15%;
    border-bottom: ${props => props.location === "/" ? "2px solid #AD73FD" : null};
  }

  .navFriends {
    margin-left: 7%;
    white-space: nowrap;
    border-bottom: ${props => props.location === "/find_friends" ? "2px solid #AD73FD" : null};
  }
`

const Right = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;

  button {
    margin: 0 2%;
    border: none;
    background-color: inherit;

    :hover {
      cursor: pointer;
    }

    :active {
      transform: translateY(2px);
    }
  }

  .notifications {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      height: 18px;
      width: 18px;
    }

    p {
      height: 21px;
      width: 21px;
      border-radius: 50%;
      background: ${props => props.theme.motionColor};
      margin-left: 5%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${props => props.theme.textSizeS};
      color: white;
      margin-bottom: 25px;
    }
  }

  .user {
    height: 47.5px;
    width: 42.5px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .menu {
    height: 24px;
    width: 24px;
  }
`

const NotificationDropDown = styled.div`
  height: fit-content;
  width: 362px;
  position: absolute;
  right: 145px;
  top: 70px;
  background: white;
  flex-direction: column;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 10;
  padding: 2%;
`

const MenuDropDown = styled.div`
  height: 96px;
  width: 180px;
  position: absolute;
  right: 47px;
  top: 70px;
  background: white;
  flex-direction: column;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  justify-content: center;
  z-index: 10;

  button {
    margin: 0 2%;
    border: none;
    background: none;

    :hover {
      cursor: pointer;
    }

    :active {
      transform: translateY(2px);
    }
  }

  .profile {
    height: 45%;
    width: 100%;
    margin: 1% 0;
    background: rgba(0, 0, 0, 0.05);
  }

  .logout {
    height: 45%;
    width: 100%;
    margin: 1% 0;
  }
`

const Header = () => {
    const location = useLocation();
    const history = useHistory();

    const [menuClick, setMenuClick] = useState(false);
    const [notificationsClick, setNotificationsClick] = useState(false);

    const dispatch = useDispatch();
    const url = "https://motion.propulsion-home.ch/backend/api/social/friends/requests/";
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
            type: "getRequests",
            payload: resData
        }
        dispatch(action);
    }

    useEffect(() => fetchData(url), []) // eslint-disable-line react-hooks/exhaustive-deps

    let requestsSent = [];
    let requestsReceived = [];
    let requests = [];

    const allRequests = useSelector(state => state.notificationsReducer);

    if (allRequests.results) {
        requests = allRequests.results.filter(element => element.status === "P");
        requestsSent = requests.filter(element => element.requester.id === parseInt(localStorage.id));
        requestsReceived = requests.filter(element => element.receiver.id === parseInt(localStorage.id));
    }

    const menu = () => {
        const newNotificationsClick = false;
        setNotificationsClick(newNotificationsClick);
        const newMenuClick = !menuClick;
        setMenuClick(newMenuClick);
    }

    const notifications = () => {
        const newMenuClick = false;
        setMenuClick(newMenuClick);
        const newNotificationsClick = !notificationsClick;
        setNotificationsClick(newNotificationsClick);
    }

    const goToProfile = () => {
        history.push("/profile");
    }

    const logout = () => {
        localStorage.clear();
        history.push("/login");
        const action = {
            type: "USER_LOGOUT"
        }
        dispatch(action);
    }

    return (
        <>
            <NavBar>
                <Left location={location.pathname}>
                    <Link to="/" className="navHome">
                        <img src={logo} alt="logo icon"/>
                        Motion
                    </Link>
                    <Link to="/" className="navPosts">
                        <img src={location.pathname === "/" ? posts_logo : posts_logo_grey} alt="logo icon"/>
                        Posts
                    </Link>
                    <Link to="/find_friends" className="navFriends">
                        <img src={location.pathname === "/find_friends" ? icon_friends : icon_friends_grey} alt="logo icon"/>
                        Find friends
                    </Link>
                </Left>
                <Right>
                    <button className="notifications" onClick={notifications}>
                        <img src={notification} alt="notifications icon"/>
                        {requests.length === 0 ? null : <p>{requests.length}</p>}
                    </button>
                    <button className="user" onClick={menu}>
                        <img src={localStorage.profilePic !== 'null' ? localStorage.profilePic : avatar} alt="user icon"/>
                    </button>
                    <button className="menu" onClick={menu}>
                        <img src={menuIcon} alt="menu icon"/>
                    </button>
                </Right>
                <MenuDropDown style={{display: menuClick ? "flex" : "none"}}>
                    <button className="profile" onClick={goToProfile}>Profile</button>
                    <button className="logout" onClick={logout}>Logout</button>
                </MenuDropDown>
                <NotificationDropDown style={{display: notificationsClick ? "flex" : "none"}}>
                    <div>
                        <p>Received requests</p>
                        {requests.length > 0 ? requestsReceived.length > 0 ? requestsReceived.map(element => <NotificationComponent key={element.id}
                                                                                                                                    request={element}/>) : "No requests" : "No requests"}
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <p>Sent requests</p>
                        {requests.length > 0 ? requestsSent.length > 0 ? requestsSent.map(element => <NotificationComponent key={element.id}
                                                                                                                            request={element}/>) : "No requests" : "No requests"}
                    </div>
                </NotificationDropDown>
            </NavBar>

        </>
    )
}

export default Header;