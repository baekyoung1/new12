import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import styled from 'styled-components/native';



const ConfigTimerInput = (props) => {
  return (
    <View style={style.configInputContainer}>
      <Text style={style.typeText}>{props.data.type} Time(MM:SS): </Text>
      <TextInput
        style={style.inputField}
        defaultValue={`${props.data.minutes}`}
        onChangeText={(text) => {
          props.data.minutes = parseInt(text);
          props.onUpdate(props.data);
        }}
        placeholder="Minutes"
        keyboardType="numeric"
      />

        
      <Text> : </Text>
      <TextInput
        style={style.inputField}
        defaultValue={`${props.data.seconds}`}
        onChangeText={(text) => {
          props.data.seconds = parseInt(text);
          props.onUpdate(props.data);
        }}
        maxLength={2}
        placeholder="Seconds"
        keyboardType="numeric"
      />
    </View>
  );
};

ConfigTimerInput.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }),
};

const style = StyleSheet.create({
  configInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 5,
    padding: 5,
    color: "#778bdd",

  },
  inputField: {
    border: '1.5px solid #778bdd',
    margin: 4,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    color: "#778bdd",

  },
  typeText: {
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "#778bdd",
  },
});

export default ConfigTimerInput;

//텍스트 인풋 색상