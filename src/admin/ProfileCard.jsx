import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Customers from "./Customers";
import image1 from "../assets/profile_male.svg";
import image2 from "../assets/profile_female.svg";
import "./ProfileCard.css";

const ProfileCard = ({
  fname,
  lname,
  gender,
  accNo,
  addhar,
  address,
  balance,
  branchName,
  debitCard,
  dob,
  email,
  ifsc,
  mobile,
  nominee,
  pan,
  status,
  upi,
}) => {
  const [close, setClose] = useState(false);
  const [image, setImage] = useState(image1);

  useEffect(() => {
    if (gender === "Female") {
      setImage(image2);
    }
  }, [gender]);

  if (!close) {
    return (
      <div className="profile">
        <div className="profile__left">
          <div className="profile__image">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="profile__right">
          <div className="card">
            <div className="heading">
              <Typography
                variant="h4"
                component="h4"
                className="heading__title"
              >
                {fname}'s Profile
              </Typography>
              <div className="close">
                <IconButton
                  onClick={() => setClose(true)}
                  className={"MyCustomButton"}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <div className="personal">
              <div className="personal__heading">
                <Typography variant="h5" component="h5">
                  Personal Details
                </Typography>
              </div>
              <div className="personal__info">
                <div className="personal__left">
                  <Typography variant="h6" component="h6">
                    Full Name:{" "}
                    <span>
                      {fname} {lname}
                    </span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Gender: <span>{gender}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Email: <span>{email}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Mobile Number: <span>{mobile}</span>
                  </Typography>
                </div>
                <div className="personal__right">
                  <Typography variant="h6" component="h6">
                    Nominee Name: <span>{nominee}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Marital Status: <span>{status}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    PAN Number: <span>{pan}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Aadhar Number: <span>{addhar}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Address: <span>{address}</span>
                  </Typography>
                </div>
              </div>
            </div>
            <div className="account">
              <div className="account__heading">
                <Typography variant="h5" component="h5">
                  Account Details
                </Typography>
              </div>
              <div className="account__info">
                <div className="account__left">
                  <Typography variant="h6" component="h6">
                    Branch Name: <span>{branchName}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    IFSC Code: <span>{ifsc}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Active UPI: <span>{upi}</span>
                  </Typography>
                </div>
                <div className="account__right">
                  <Typography variant="h6" component="h6">
                    Account Number: <span>{accNo}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Available Balance: <span>{balance}</span>
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Active Debit Card: <span>{debitCard}</span>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Customers />;
  }
};

export default ProfileCard;
