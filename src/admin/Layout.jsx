import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./Layout.css";

// Styled components for better Material-UI integration
const LogoTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: 'none',
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const RightLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  '&.active': {
    textDecoration: 'underline',
  },
}));

const Layout = () => {
  return (
    <div>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: '#6c63ff' }}>
        <Toolbar className="app_items">
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <LogoTypography variant="h6">Banking Admin Panel</LogoTypography>
          </NavLink>

          <div className="appbar__right">
            <NavLink to="/transaction" style={{ textDecoration: 'none' }}>
              <RightLink variant="body1" activeClassName="active">
                Transaction History
              </RightLink>
            </NavLink>
            <NavLink to="/customers" style={{ textDecoration: 'none' }}>
              <RightLink variant="body1" activeClassName="active">
                View All Customers
              </RightLink>
            </NavLink>
            <NavLink to="/money" style={{ textDecoration: 'none' }}>
              <RightLink variant="body1" activeClassName="active">
                Money Transfer
              </RightLink>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
