import React from "react";
import { Box, useMediaQuery, Container } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import cx from "classnames";
// import ReactPlayer from "react-player";
import ScrollAnimation from "react-animate-on-scroll";
import i18next from "i18next";

import { useIsDarkMode } from "state/user/hooks";
import { GradientButton } from "components/Button";

import BG_VECTEEZY from "assets/backgrounds/vecteezy.png";

// const heroVideo =
//   "https://background.sfo3.digitaloceanspaces.com/stablecoin/output.webm";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    padding: "0px",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  background: {
    lineHeight: 0,

    "& > img": {
      width: "100%",
      height: "600px",

      [breakpoints.down("xs")]: {
        height: "400px",
      },
    },
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    // background: "rgba(24, 34, 113, 0.6)",

    [breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  title: {
    fontFamily: "Brandon Grotesque",
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: "64px",
    lineHeight: "100%",
    color: "#73D6F1",

    [breakpoints.down("sm")]: {
      fontSize: "35px",
    },
  },

  content: {
    fontFamily: "Museo Sans",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "18px",
    lineHeight: "26px",
    width: "50%",
    color: palette.text.primary,
    marginTop: "30px",

    [breakpoints.down("sm")]: {
      fontSize: "16px",
      lineHeight: "18.4px",
      width: "100%",
      marginTop: "15px",
      padding: "0px 10px",
    },
  },
}));

const StableCoinSection: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  return (
    <Box className={cx(classes.root)}>
      {/* <ReactPlayer
        url={heroVideo}
        playing={false}
        loop={true}
        muted
        width={!mobile ? "100%" : "unset"}
        height={!mobile ? "600px" : "400px"}
        playbackRate={0.5}
      /> */}
      <Box className={cx(classes.background)}>
        <img src={BG_VECTEEZY} alt="bg" />
      </Box>
      <Box className={cx(classes.container)}>
        <Container>
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Box className={cx(classes.title)}>
              {i18next.t("PAGE.LANDING.STABLECOIN.TITLE")}
            </Box>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Box
              className={cx(classes.content)}
              dangerouslySetInnerHTML={{
                __html: i18next.t("PAGE.LANDING.STABLECOIN.CONTENT", {
                  interpolation: { escapeValue: false },
                }),
              }}
            />
          </ScrollAnimation>
          <Box mt={!mobile ? "50px" : "30px"} />
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <GradientButton label={"COMING SOON"} width={160} height={40} />
          </ScrollAnimation>
        </Container>
      </Box>
    </Box>
  );
};

export default StableCoinSection;
