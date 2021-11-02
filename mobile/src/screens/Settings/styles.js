import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  }
});