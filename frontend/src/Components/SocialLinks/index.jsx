import React from "react";
import styled from "styled-components";
import logo_white from "../../assets/images/logo_white.png";
import background_image from "../../assets/images/background_image.png";
import apple from "../../assets/svgs/apple.svg";
import google from "../../assets/svgs/google.svg";
import twitter from "../../assets/svgs/twitter_icon.svg";
import facebook from "../../assets/svgs/facebook_icon.svg";
import instagram from "../../assets/svgs/instagram_icon.svg";


const SocialLinksWrapper = styled.div`
    height: 100vh;
    width: 40%;
    display: flex;
    flex-direction: column;
    background-image: url(${background_image}), ${props => props.theme.motionColor};
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
`

const Top = styled.div`
    height: 58%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    h1 {
        font-size: ${props => props.theme.textSizeXXL};
        color: #FFFFFF;
        margin-top: 2%;
        font-weight: 500;
    }

    p {        
        width: 36%;
        font-size: ${props => props.theme.textSizeDefault};
        color: #FFFFFF;
        text-align: center;
        opacity: 0.9;
        margin-top: 5%;
        font-weight: 500;
    }
`
const Middle = styled.div`
    height: 22%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        height: 40px;
        width: 126px;
        margin: 0 2%;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 100px;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
        
        :hover {
        cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }

        .google {
            padding-top: 3px;
        }
    }
`

const Bottom = styled.div`
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        height: 50%;
        color: white;
        display: flex;
        align-items: center;
        font-size: ${props => props.theme.textSizeS};
    }
`

const IconsBottom = styled.div`
    display: flex;
    height: 50%;
    justify-content: center;
    align-items: flex-end;

    button {
        border: none;
        background: none;

        :hover {
            cursor: pointer;
        }
        
        :active {
            transform: translateY(2px);
        }
    }

    img {
        height: 40px;
        margin: 0 10px;
        opacity: 0.5;
    }

    .twitter{
        height: 45px;
        margin-bottom: -2px;
    }
`

const SocialLinks = () => {
    return (
        <SocialLinksWrapper>
            <Top>
                <img src={logo_white} alt="logo"/>
                <h1>Motion</h1>
                <p>Connect with friends and the world around you with Motion.</p>
            </Top>
            <Middle>
                <button>
                    <img src={apple} alt="apple icon"/>
                </button>
                <button>
                    <img src={google} alt="google icon" className="google"/>
                </button>
            </Middle>
            <Bottom>
                <IconsBottom>
                    <button>
                        <img src={twitter} alt="twitter icon" className="twitter"/>
                    </button>
                    <button>
                        <img src={facebook} alt="facebook icon" />
                    </button>
                    <button>
                        <img src={instagram} alt="instagram icon" />
                    </button>    
                </IconsBottom>        
                <p>© Motion 2018. All rights reserved.</p>
            </Bottom>
        </SocialLinksWrapper>
    )
}

export default SocialLinks;