import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const LoginStyles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  logo: {
    width: wp(100),
    height: hp(15),
    resizeMode: 'contain',
    marginVertical: 50,
  },
  loginCard: {
    width: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginCardView: {
    width: wp(70),
    flexShrink: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardLoginText: {
    padding: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
  },
  TextField: {
    width: '100%',
    marginVertical: 8,
  },
  usernameTF: {},
  passwordTF: {},
  passwordEye: {
    backgroundColor: 'white',
  },
  loginButton: {
    marginVertical: 16,
    backgroundColor: '#1450A9',
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
  },
  signUpView: {
    position: 'absolute',
    top: hp(100) - 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signUpText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  signUpButton: {},
  signUpButtonText: {
    fontSize: 20,
    color: '#1450A9',
    fontWeight: 'bold',
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
