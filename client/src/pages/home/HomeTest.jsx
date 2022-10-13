import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
//import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState, } from "react";
import axios from "axios";
import { setCurrentProfile } from "../../redux/Profile/actions/profileAction";
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom";

const HomeTest = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [open, setOpen] = useState(false);
  const profiles = useSelector((state) => state.profiles.profile);
  const currentProf = useSelector((state) => state.profiles.currentProfile);
  const dispatch = useDispatch()
  const history = useHistory();

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };
  
  const showProfiles = profiles.filter((item) => {
    return item._id !== currentProf._id;
  });
  const handleClick = (item, e) => {
    e.preventDefault();
    dispatch(setCurrentProfile(item));
  };
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="">
      
      {/* <Navbar /> */}
      <div className="header--user">
        <a>
          <img
            onClick={handleOpen}
            src=""
            alt="Usuário"
          />
        </a>
      </div>
      asdasdasd
      {open && (
        <div className="modal-box-profiles">
          {showProfiles &&
            showProfiles.map((item) => (
              <div className="each-profile-box">
                {/* <img src={item.profilePic} alt={item.name} /> */}
                <div
                  onClick={(e) => handleClick(item, e)}
                  className="each-profile-name"
                >
                  {item.name}
                </div>
              </div>
            ))}
          {/* <div
            onClick={() => history.push("/profiles")}
            className="each-profile-box"
          >
            {" "}
            Manage Profiles{" "}
          </div> */}
          {/* <div className="profile-box-line"></div>
          <div className="profile-text-bottom">Account</div>
          <div className="profile-text-bottom">Help Center</div>
          <div onClick={handleLogout} className="profile-text-bottom">
            Sign out of Netflix
          </div> */}
        </div>
      )}
    </div>
  );
};

export default HomeTest;
