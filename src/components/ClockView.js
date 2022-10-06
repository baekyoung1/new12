import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const ClockView = (props) => {
  return (
    <View style={styles.clockviewContainer}>
      <Text style={styles.clockViewHeader}>{props.time.type} Time</Text>
      <Text style={styles.timeText}>
        {props.time.minutes}:{padZero(props.time.seconds)}
      </Text>
    </View>
  );
};

ClockView.propTypes = {
  time: PropTypes.shape({
    type: PropTypes.string.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
};

ClockView.defaultProps = {
  time: {
    type: "Default",
    minutes: 0,
    seconds: 0,
  },
};

const padZero = (number) => {
  if (number.toString().length === 1) {
    return "0" + number.toString();
  } else {
    return number;
  }
};

const styles = StyleSheet.create({
  clockviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,

    width: '90%', 
    display: 'flex', 
    height: '200px', 
    flexDirection: 'column', 
    border: '10px solid #778bdd',
    borderRadius: '6px',
    fontWeight: '700'
  },

  clockViewHeader: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: '3rem',
    margin: 1,
    color: "#778bdd",
  },

  timeText: {
    fontWeight: "500",
    fontSize: '3rem',
    margin: 3,
    color: "#778bdd",
  },
});

//워크타임브레이크타임 흐르는 시간 -헤더부분
export default ClockView;