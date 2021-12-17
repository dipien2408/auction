import Countdown from "react-countdown";
import React from 'react'

const renderer = ({ hours, minutes, seconds }) => {
  return <span style={{margin: "10px 0px", fontSize: "60px"}}>{hours}:{minutes}:{seconds}</span>;
};

export const Timer = ({time}) => {
    return (
        <Countdown
              date={time}
              renderer={renderer}
        />
    )
}