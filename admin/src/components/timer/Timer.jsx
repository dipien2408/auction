import Countdown from "react-countdown";
import React from 'react'

const renderer = ({ hours, minutes, seconds }) => {
  return <span style={{fontSize: "17px"}}>{hours}:{minutes}:{seconds}</span>;
};

export const Timer = ({time}) => {
    return (
        <Countdown
              date={time}
              renderer={renderer}
        />
    )
}