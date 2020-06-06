import React from "react";
import Showcase from "./Showcase";
import Features from "./Features";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

export default function About() {
  return (
    /*
        Make block by blockm each block put relevant info
        - Welcome to Mod Planner (Align center)
        - Give general description
        - Features (Each feature one block, put photo beside)
        - Put contact details below
        
        To-do:
        - create rough outline (disregard the width issue first if cannot solve)
        - test to debug width issue
    */
    <div className="container">
      <Showcase />
      <h1>Welcome to Mod Planner!</h1>
      <Typography variant="h6">
        We are a team of students who aims to enhance the experience and ease
        the struggles of students during modules planning. We aim to do so by
        introducing sharing platforms, user-initiated guides and forums to
        facilitate the environment for planning modules.
      </Typography>
      <Features />
      <Box height={150}>
        <Typography variant="subtitle1">
          Feel free to contact us, Python Snakes for any queries!
        </Typography>
        <Typography variant="subtitle1">
          Lim Zi Yang : limziyang8@gmail.com
        </Typography>
        <Typography variant="subtitle1">
          Low Siang Ern: lowsiangern@gmail.com
        </Typography>
      </Box>
    </div>
  );
}
