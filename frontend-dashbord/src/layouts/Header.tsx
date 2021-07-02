import React, { useState } from "react";
import {
  Box,
  Link,
  IconButton,
  Drawer,
  useMediaQuery,
  Container,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Hamburger from "hamburger-react";
import cx from "classnames";

import { useIsDarkMode } from "state/user/hooks";
import { useHistory, useLocation } from "react-router-dom";
import ThemeSwitch from "components/ThemeSwitch";
import { Button } from "components/Button";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  self: {
    position: "fixed",
    top: 0,
    background: palette.background.default,
    zIndex: 100,
    width: "100%",
    paddingBottom: "10px",
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background .2s ease-in",
  },

  logo: {
    cursor: "pointer",
    "& img": {
      width: "300px",

      [breakpoints.down("sm")]: {
        width: "200px",
      },
    },
  },

  navBar: {
    display: "flex",
    flexFlow: "wrap",
    alignItems: "center",
    background: palette.background.default,
    fontFamily: "Brandon Grotesque Bold",

    "& a": {
      margin: "5px 15px",
      color: palette.text.primary,
      fontWeight: 900,
      fontSize: "18px",
      cursor: "pointer",

      "&:hover": {
        "text-decoration-thickness": "2px",
      },
    },

    "& .active": {
      color: "#FFFFFF",
      borderRadius: "25px",
      background: palette.primary.light,
      padding: "5px 20px",
    },

    [breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  },

  subHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItem: "center",
  },
}));

type NavListType = {
  label: string;
  link: string;
};

export interface HeaderProps {
  logo?: string;
  navList: Array<NavListType>;
}

const Header: React.FC<HeaderProps> = ({ logo, navList }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dark = useIsDarkMode();
  const classes = useStyles({ dark, mobile });
  const history = useHistory();
  const { pathname } = useLocation<{ previous: string }>();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const isActiveURL = (link: string): boolean => {
    return pathname.indexOf(link) > -1;
  };

  const onConnectWallet = (event: any) => {
    console.log("connect wallet button clicked!");
  };

  return (
    <Box className={cx(classes.self)}>
      <Container>
        <Box className={cx(classes.container)}>
          <Box className={cx(classes.logo)} onClick={() => history.push("/")}>
            <img src={logo} alt="Ardana Logo" />
          </Box>

          {!mobile && (
            <Box className={cx(classes.navBar)}>
              {navList.map((navItem, index) => (
                <Link
                  className={isActiveURL(navItem.link) ? "active" : ""}
                  key={index}
                  href={navItem.link}
                >
                  {navItem.label}
                </Link>
              ))}
            </Box>
          )}

          {mobile && (
            <>
              <IconButton
                style={{ height: "48px", padding: 0 }}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <Hamburger
                  size={24}
                  distance={"lg"}
                  color={theme.palette.text.primary}
                  toggled={openMenu}
                  toggle={setOpenMenu}
                />
              </IconButton>
              <Drawer anchor={"top"} open={openMenu} onClose={toggleMenu}>
                <Box className={cx(classes.navBar)}>
                  {navList.map((navItem, index) => (
                    <Link key={index} href={navItem.link}>
                      {navItem.label}
                    </Link>
                  ))}
                </Box>
              </Drawer>
            </>
          )}
        </Box>
        <Box className={cx(classes.subHeader)}>
          <ThemeSwitch />
          <Button variant="contained" onClick={onConnectWallet} style={{background: theme.palette.secondary.dark}}>
            Connect Wallet
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;