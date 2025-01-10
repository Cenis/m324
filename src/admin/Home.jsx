import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import image from "../assets/bank2.svg";

// Styled components for better Material-UI integration
const HomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Home = () => {
  return (
    <HomeContainer>
      <Box>
        <Title variant="h2" component="h3">
          Welcome to Our Banking System
        </Title>
        <SubTitle variant="h6" component="h6">
          Demo Project Work for testing purposes
        </SubTitle>
        <Box>
          <NavLink to="/transaction" style={{ textDecoration: 'none' }}>
            <ButtonStyled
              variant="outlined"
              size="large"
              color="error"
            >
              View Transactions
            </ButtonStyled>
          </NavLink>
          <NavLink to="/money" style={{ textDecoration: 'none' }}>
            <ButtonStyled variant="outlined" size="large">
              Money Transfer
            </ButtonStyled>
          </NavLink>
        </Box>
      </Box>
      <Box>
        <img src={image} alt="Banking" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </HomeContainer>
  );
};

export default Home;
