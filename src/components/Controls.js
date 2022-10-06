import React from "react";
import { StyleSheet, Button, View } from "react-native";
import PropTypes from "prop-types";

const Controls = (props) => {
  const startPauseText = props.isTimerRunning ? "Pause" : "Start";
  return (
    <View style={style.controlContainer}>
      <Button
        style={style.button}
        onPress={props.onStartPausePress}
        title={startPauseText}
      />
      <Button
        style={style.button}
        onPress={props.onResetPress}
        title="Reset"
      />
    </View>
  );
};

Controls.propTypes = {
  onStartPausePress: PropTypes.func.isRequired,
  onResetPress: PropTypes.func.isRequired,
};

const style = StyleSheet.create({
  controlContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,

  },
  button: {
    margin: 5,
    padding: 5,
  },
});

export default Controls;