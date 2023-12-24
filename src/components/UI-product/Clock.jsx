import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";

export default function Clock() {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [miuntes, setMiuntes] = useState();
  const [seconds, setSeconds] = useState();
  let interval;
  const countDawn = () => {
    const destination = new Date(" January 1  , 2024").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const diffrent = destination - now;
      const days = Math.floor(diffrent / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffrent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diffrent % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffrent % (1000 * 60)) / 1000);
      if (destination < 0) clearInterval(interval.current);
      else {
        setDays(days);
        setHours(hours);
        setMiuntes(minutes);
        setSeconds(seconds);
      }
    });
  };
  useEffect(()=>{
    countDawn()
  })
  return (
    <Box my={"20px"}>
      <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
        <Box>
          <Typography variant="h6" m={0} color={grey[50]}>
            {" "}
            {days}{" "}
          </Typography>
          <Typography variant="body2" color={grey[50]} m={0}>
            {" "}
            days{" "}
          </Typography>
        </Box>
        <Typography variant="body1" color={grey[50]}>
          :
        </Typography>
        <Box>
          <Typography variant="h6" m={0} color={grey[50]}>
            {" "}
            {hours}{" "}
          </Typography>
          <Typography variant="body2" color={grey[50]} m={0}>
            hours{" "}
          </Typography>
        </Box>
        <Typography variant="body1" color={grey[50]}>
          :
        </Typography>
        <Box>
          <Typography variant="h6" m={0} color={grey[50]}>
            {" "}
            {miuntes}{" "}
          </Typography>
          <Typography variant="body2" color={grey[50]} m={0}>
            {" "}
            miuntes{" "}
          </Typography>
        </Box>
        <Typography variant="body1" color={grey[50]}>
          :
        </Typography>
        <Box>
          <Typography variant="h6" m={0} color={grey[50]}>
            {" "}
            {seconds}{" "}
          </Typography>
          <Typography variant="body2" color={grey[50]} m={0}>
            seconds{" "}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
