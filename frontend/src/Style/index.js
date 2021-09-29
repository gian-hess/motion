import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    html,
    body,
    #root {
        height: 100vh;
        width: 100%;
    }
    
    #root {
        display: flex;
    }
`

export const defaultTheme = {
    // Colors:
    motionColor: `linear-gradient(132.96deg, #C468FF 3.32%, #6E91F6 100%)`,     

    // Box Shadows:
    boxShadowDark: `-5px 6px 15px 1px rgba(0,0,0,0.50)`,
    boxShadowLight: `-5px 6px 15px 1px rgba(0,0,0,0.25)`,
    boxShadowLighter: `-5px 6px 15px 1px rgba(0,0,0,0.15)`,
    boxShadowNav: `2px 0 24px 0 rgba(0,0,0,0.04)`,
    boxShadowTiles: `0 2px 24px 0 rgba(0,0,0,0.04)`,
    boxShadowInTiles: `0 1px 3px 0 rgba(0,0,0,0.2)`,

    // Sizes
    controlHeight: '40px',
    controlHeightMini: '24px',
    controlHeightSmall: '32px',
    controlHeightLarge: '48px',
    spaceXXS: '4px',
    spaceXS: '8px',
    spaceS: '16px',
    spaceM: '24px',
    spaceL: '32px',
    spaceXL: '48px',
    spaceXXL: '220px',

    // Text Size
    textSizeXXL: '30px',
    textSizeXL: '24px',
    textSizeL: '22px',
    textSizeM: '15px',
    textSizeDefault: "16px",
    textSizeS: '12px',

    // Text Weight
    textWeightThin: '300',
    textWeightRegular: '400',
    textWeightMedium: '500',
    textWeightBold: '700'
}


