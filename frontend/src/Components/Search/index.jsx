import styled from 'styled-components';
import search_icon from "../../assets/svgs/search_icon.svg"
import Input from '../Input';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useState} from "react";

const SearchWrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1.5px rgba(226, 223, 223, 0.619) solid;
  /*   border: solid 2px orange; */
`
const SearchLeft = styled.div`
  height: 100%;
  width: 70%;
  /*  border: solid 2px green;  */

`
const SearchBox = styled.form`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;

  /*  border: solid 2px blue; */

  img {
    margin-left: 170px;
    margin-right: 20px;
  }
`
const SearchInput = styled(Input)`
  color: rgb(119, 119, 119);
  margin-right: 680px;

`

const SearchRight = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: flex-end;
  padding-right: 8%;
  /*    border: solid 2px yellow; */
`

const SearchLink = styled.div`
  height: 100%;
  border-bottom: 2px solid ${props => props.selected ? "purple" : "none"};

  a {
    height: 100%;
    font-size: ${props => props.theme.textSizeDefault};
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    padding: 0 20px;

    :active {
      transform: translateY(2px);
    }
  }
`


const Search = () => {

    const history = useHistory();
    const location = useLocation();

    const [search, setSearch] = useState('');

    const OnChange = (e) => {
        setSearch(e.target.value);
    }

    const OnSubmitHandler = (event) => {
        event.preventDefault();
        history.push(`/posts/?search=${search}`);
        setSearch("")
    }

    return (
        <SearchWrapper>
            <SearchLeft>
                <SearchBox onSubmit={OnSubmitHandler}>
                    <img src={search_icon} alt='search'/>
                    <SearchInput name="Search posts..." type="text" value={search} onChange={OnChange}/>
                </SearchBox>
            </SearchLeft>
            <SearchRight>
                <SearchLink selected={location.pathname === "/posts/liked"}>
                    <Link to="/posts/liked">Liked</Link>
                </SearchLink>
                <SearchLink selected={location.pathname === "/posts/friends"}>
                    <Link to="/posts/friends">Friends</Link>
                </SearchLink>
                <SearchLink selected={location.pathname === "/posts/follow"}>
                    <Link to="/posts/follow">Follow</Link>
                </SearchLink>
            </SearchRight>
        </SearchWrapper>
    )
}

export default Search;