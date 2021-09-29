import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Auth from './Pages/Auth';
import { defaultTheme, GlobalStyle } from './Style'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import SignUp from './Pages/SignUp';
import Posts from './Pages/Posts';
import FindFriends from './Pages/FindFriends';
import { Provider } from 'react-redux';
import store from "./Store"
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';
import WithAuth from "./Components/HOC/withAuth"

const token = localStorage.getItem("token");
store.dispatch({type: "setToken", payload: token})

ReactDOM.render(
  <Provider store={ store }>
    <ThemeProvider theme={ defaultTheme }>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" component={ WithAuth(Posts) } exact/>
          <Route path="/posts" component={ Posts } />
          <Route path="/login" component={ Auth } />
          <Route path="/signup" component={ SignUp } exact/>          
          <Route path="/find_friends" component={ FindFriends } exact/>
          <Route path="/profile" component={ Profile } />
          <Route path="/edit" component={ ProfileEdit } />
        </Switch>
      </Router>   
    </ThemeProvider>
  </Provider>,
  
  document.getElementById('root')
);
