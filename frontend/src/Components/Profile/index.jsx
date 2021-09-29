import { ProfileBox, BackgroundImg, ProfileLeft, BoxLeft, BoxRight, BoxBottomRight, BoxTopRight, ProfileDetails, ProfileContacts } from "./styled"
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import avatar from '../../assets/svgs/avatar.svg';


const ProfileHead = () => {

    const location = useLocation();
    const history = useHistory();
    const [userData, setUserData] = useState({});

    const edit = () => {
        history.push('/edit')
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
          setUserData(resData)
        }

        fetchUsers()
      }, [])
    

    return (
        <>
            <BackgroundImg backgroundIMG={userData.banner}></BackgroundImg>
            <ProfileBox>
                <BoxLeft>
                    <ProfileLeft>
                        <img alt='profile' src={userData.avatar ? userData.avatar : avatar} />
                        <h1>{`${userData.first_name} ${userData.last_name}`}</h1>
                        <h4>{userData.location}</h4>
                        <button onClick={edit}>EDIT PROFILE</button>
                    </ProfileLeft>
                </BoxLeft>
                <BoxRight>
                    <BoxTopRight>
                        <ProfileDetails>
                            <h5>About</h5>
                            <p>{userData.about_me}</p>
                        </ProfileDetails>
                        <ProfileDetails>
                            <h5>Things I like</h5>
                            {userData.things_user_likes && userData.things_user_likes.map(e => {
                                return <button>{e}</button>
                            })}
                        </ProfileDetails>
                        <ProfileContacts>
                            <div>
                            <h4>Email</h4>
                            <p>{userData.email}</p>
                            </div>
                            <div>
                            <h4>Phone</h4>
                            <p>123-456-7890</p>
                            </div>
                        </ProfileContacts>
                    </BoxTopRight>
                    <BoxBottomRight location={location.pathname}>
                        <Link to='/profile' className='ProfilePosts'>
                            
                            <div className='pagelink'>
                                <h1>
                                    {userData.amount_of_posts}
                                </h1>
                                <h3>
                                    Posts
                                </h3>
                            </div>
                        </Link>
                        <Link to='/profile/likes' className='ProfileLikes'>
                        <div className='pagelink'>
                            <h1>
                                {userData.amount_of_likes}
                            </h1>
                            <h3>
                                Likes 
                            </h3>
                        </div>
                        </Link>
                        <Link to='/profile/friends' className='ProfileFriends'>
                        <div className='pagelink'>
                            <h1>
                                {userData.amount_of_friends}
                            </h1>
                            <h3>
                                Friends
                            </h3>
                        </div>
                        </Link>
                        <Link to='/profile/followers' className='ProfileFollowers'>
                        <div className='pagelink'>
                            <h1>
                                {userData.amount_of_followers}     
                            </h1>
                            <h3>
                                Followers
                            </h3>
                        </div>
                        </Link>
                        <Link to='/profile/following' className='ProfileFollowing'>
                        <div className='pagelink'>
                            <h1>
                                {userData.amount_following}
                            </h1>
                            <h3>
                                Following
                            </h3>
                        </div>
                        </Link>
                    </BoxBottomRight>
                </BoxRight>
            </ProfileBox>
        </>
    )
}

export default ProfileHead;