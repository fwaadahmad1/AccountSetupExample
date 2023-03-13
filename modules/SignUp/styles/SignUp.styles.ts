import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const SignUpStyles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: wp(100),
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  signUpCard: {
    width: '80%',
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  signUpCardView: {
    width: wp(70),
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: wp(100),
    height: hp(15),
    resizeMode: 'contain',
    marginVertical: 30,
  },
  cardLoginText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
  },
  TextField: {
    width: '100%',
    marginTop: 16,
  },
  usernameTF: {},
  passwordTF: {},
  signUpButton: {
    backgroundColor: '#1450A9',
    width: '100%',
    marginTop: 16,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 20,
  },
  errorTextStyle: {
    alignSelf: 'flex-start',
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
