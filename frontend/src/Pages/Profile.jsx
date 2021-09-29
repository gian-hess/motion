import { Route, Switch } from "react-router"
import Header from "../Components/Header"
import ProfileHead from "../Components/Profile"
import Followers from "../Components/Profile/Followers"
import Following from "../Components/Profile/Following"
import Friends from "../Components/Profile/Friends"
import Likes from "../Components/Profile/Likes"
import PersonalPosts from "../Components/Profile/PersonalPosts"



const Profile = () => {

    return (
        <>
            <Header />
            <ProfileHead />
            <Switch>
                <Route path="/profile" component={ PersonalPosts } exact/>
                <Route path="/profile/likes" component={ Likes } exact/>
                <Route path="/profile/friends" component={ Friends } exact/>
                <Route path="/profile/followers" component={ Followers } exact/>
                <Route path="/profile/following" component={ Following } exact/>
            </Switch>
        </>

    )
}


export default Profile;