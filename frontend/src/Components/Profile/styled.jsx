import styled from "styled-components";

export const BackgroundImg = styled.img`
  background-image: url(${props => props.backgroundIMG});
  position: absolute;
  width: 100%;
  height: 320px;
  left: 0px;
  top: 0px;
  z-index: -1;
`


export const ProfileBox = styled.div`
  position: absolute;
  width: 80vw;
  height: 400px;
  top: 200px;
  margin-left: 10vw;

  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
`

export const BoxLeft = styled.div`
  height: 400px;
  width: 319px;
  border-right: #00000014 solid 1px;
`

export const ProfileLeft = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }

  h1 {
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    margin-top: 17px;
  }

  h4 {
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    margin-top: 8px;
  }

  button {
    height: 40px;
    width: 158px;
    border: 1px solid #00000028;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
    border-radius: 30px;
    background: none;
    margin-top: 40px;

    :hover {
      cursor: pointer;
      background: #00000028;
      color: white;
    }

    :active {
      transform: translateY(2px);
    }

    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.833333px;
  }
`

export const BoxRight = styled.div`
  height: 400px;
  width: 831px;
`
export const BoxTopRight = styled.div`
  height: 264px;
  width: 831px;
  border-bottom: #00000014 solid 1px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const ProfileDetails = styled.div`
  width: 320px;
  margin-top: 40px;
  margin-left: 60px;
  word-wrap: break-word;
  

  h5 {
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 11px;
  }

  p {
    font-size: 16px;
    line-height: 26px;
  }

  button {
    height: 32px;
    border: 1px solid #00000011;
    border-radius: 18px;
    margin: 8px;
    padding: 8px 16px;

    font-size: 14px;
    line-height: 16px;
  }
`


export const ProfileContacts = styled.div`

  display: flex;
  justify-content: flex-start;

  div {
    width: 200px;
    height: 48px;
    margin-left: 60px;
    margin-bottom: 34px;

    h4 {
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 7px;
    }

    p {
      font-size: 16px;
      line-height: 26px;
    }
  }

`


export const BoxBottomRight = styled.div`
  height: 135px;
  width: 831px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .ProfilePosts {
    height: 100%;
    width: 80px;
    text-decoration: none;
    display: flex;

    border-bottom: ${props => props.location === "/profile" ? "3px solid #AD73FD" : null};

    h3 {
      opacity: ${props => props.location === "/profile" ? "1" : "0.5"};
    }
  }

  .ProfileLikes {
    height: 100%;
    width: 80px;
    text-decoration: none;
    display: flex;
    border-bottom: ${props => props.location === "/profile/likes" ? "3px solid #AD73FD" : null};

    h3 {
      opacity: ${props => props.location === "/profile/likes" ? "1" : "0.5"};
    }
  }

  .ProfileFriends {
    height: 100%;
    width: 80px;
    text-decoration: none;
    display: flex;
    border-bottom: ${props => props.location === "/profile/friends" ? "3px solid #AD73FD" : null};

    h3 {
      opacity: ${props => props.location === "/profile/friends" ? "1" : "0.5"};
    }
  }

  .ProfileFollowers {
    height: 100%;
    width: 80px;
    text-decoration: none;
    display: flex;
    border-bottom: ${props => props.location === "/profile/followers" ? "3px solid #AD73FD" : null};

    h3 {
      opacity: ${props => props.location === "/profile/followers" ? "1" : "0.5"};
    }
  }

  .ProfileFollowing {
    height: 100%;
    width: 80px;
    text-decoration: none;
    display: flex;
    border-bottom: ${props => props.location === "/profile/following" ? "3px solid #AD73FD" : null};

    h3 {
      opacity: ${props => props.location === "/profile/following" ? "1" : "0.5"};
    }
  }

  h1 {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 7px;
    color: black;

  }

  h3 {
    font-size: 16px;
    line-height: 19px;
    color: black;
    opacity: 0.5;
  }

  .pagelink {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`
export const Main = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 80px;
  display: flex;
  background: #F2F2F2;
  justify-content: center;
  align-items: center;
`

export const FriendsStuff = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  border: 5 solid black;
  margin-top: 320px;
  padding-right: 10%;
  padding-left: 10%;
  padding-top: 15%;
`


export const Users = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 2% 0;
`
export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
export const Buttons = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-around;

  button {
    height: 40px;
    width: 20%;
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
  }
`