import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { blue } from '../commonStyles';

export default StyleSheet.create({
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20
  },
  titleContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 64
  },
  actionButton: {
    padding: 10
  },
  actionContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10
  },
  menuButton: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue
  },
  menuButtonTop: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  menuButtonBottom: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10
  },
  helpText: {
    marginBottom: 20
  }
});