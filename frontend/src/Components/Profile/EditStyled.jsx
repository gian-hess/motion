import styled from "styled-components";



export const ProfileEditBox = styled.div`
    position: absolute;
    top: 200px;
    width: 80vw;
    height: 730px;
    left: 10vw;
    /* right: 144px; */
    background: #FFFFFF;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    display: flex;
`

export const EditBoxLeft = styled.div`
    height: 730px;
    width: 30%;
    border-right: #00000014 solid 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .editTopLeft{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 60px;

        img{
            height: 80px;
            width: 80px;
            border-radius: 40px;
            margin-bottom: 24px;
        }
        .popup{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 10px;

            .fileInput {
                display: none;
            }

            .fileUpload{
                height: 40px;
                width: 155px;
                border: 1px solid #00000028;
                box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
                border-radius: 30px;
                background: none;
                margin: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                
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
        }
    }

    .editBottomLeft{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 70px;
        .saveButton{
            background: ${props => props.theme.motionColor}; 
            height: 48px;
            width: 202px;
            border-radius: 30px;
            margin-top: 15px;
            border: 1px solid #00000028;
            color: white;
            
            :hover {
                cursor: pointer;
            }
            
            :active {
                transform: translateY(2px);
            }

            font-size: 10px;
            line-height: 12px;
            letter-spacing: 0.833333px;
        }
        .whiteButton{
            width: 202px;
            height: 48px;
        }
    }


    .whiteButton{
        height: 40px;
        width: 155px;
        border: 1px solid #00000028;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
        border-radius: 30px;
        background: none;
        margin: 5px;
        
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
export const EditBoxRight = styled.div`
    height: 730px;
    width: 70%;
    border-right: #00000014 solid 5px;
    display: flex;
    flex-direction: column;
    padding: 5%;    
`