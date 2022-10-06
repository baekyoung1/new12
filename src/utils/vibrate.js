import {Vibration} from 'react-native'

export default () => Vibration.vibrate([500, 500, 500])

/*
import React from "react";
import { Button, Platform, Text, Vibration, View, SafeAreaView, StyleSheet } from "react-native";

const Separator = () => {
  return <View style={Platform.OS === "android" ? styles.separator : null} />;
}

const VibratorApp = () => {

  const ONE_SECOND_IN_MS = 1000;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title]}>Vibration Example</Text>
      <View>
        <Button color="#4D9EA0" title="Vibrate once" onPress={() => Vibration.vibrate()} />
      </View>
      <Separator />
      {Platform .OS == "android"
        ? [
            <View>
              <Button
                title="Vibrate for 5 seconds"
                color="#654A3F"
                onPress={() => Vibration.vibrate(5 * ONE_SECOND_IN_MS)}
              />
            </View>,
            <Separator />
          ]
        : null}
      <Button
        title="Stop vibration"
        onPress={() => Vibration.cancel()}
        color="#FF0000"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 44,
    padding: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 24,
    textAlign: "center"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default VibratorApp;
*/