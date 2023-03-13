import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const HomeStyles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#1450A9',
  },
  loader: {
    backgroundColor: '#ffffff66',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
