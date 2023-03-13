import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SignUpStyles} from '../styles/SignUp.styles';
import {
  ActivityIndicator,
  Button,
  Card,
  HelperText,
  TextInput,
} from 'react-native-paper';
import {TextFieldTheme} from '../../common/styles/TextFieldTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {SignUpFieldsState} from '../types/SignUp.types';
import {SignUpRepository} from '../repository/SignUp.repository';
import {LoginStyles} from '../../Login/styles/Login.styles';

const PASSWORD_REGEX: RegExp = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,32}$');
const EMAIL_REGEX: RegExp = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
const PHONE_REGEX: RegExp = new RegExp(
  '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
);

export default function SignUpView({
  navigation,
}: NativeStackScreenProps<any>): JSX.Element {
  const [userInfo, setUserInfo] = useState<SignUpFieldsState>({});
  const [errorInfo, setErrorInfo] = useState<SignUpFieldsState>({});
  const [loading, setLoading] = useState<boolean>(false);

  function updateState(userInfoObj: SignUpFieldsState) {
    setUserInfo(prevState => {
      return {...prevState, ...userInfoObj};
    });
  }

  function updateErrorState(userInfoObj: SignUpFieldsState) {
    setErrorInfo(prevState => {
      return {...prevState, ...userInfoObj};
    });
  }

  function renderError(error: string): JSX.Element {
    return (
      <HelperText style={SignUpStyles.errorTextStyle} type={'error'}>
        {error}
      </HelperText>
    );
  }
  return (
    <View style={SignUpStyles.baseContainer}>
      <ImageBackground
        source={require('./../../../resources/images/background.png')}
        style={SignUpStyles.backgroundImage}>
        {loading ? (
          <ActivityIndicator
            style={SignUpStyles.loader}
            size={'large'}
            animating={true}
            color={'#1450A9'}
          />
        ) : undefined}
        <ScrollView
          style={SignUpStyles.scrollView}
          contentContainerStyle={SignUpStyles.scrollViewContent}>
          <Image
            style={SignUpStyles.logo}
            source={require('./../../../resources/images/logo.png')}
          />
          <Card mode={'elevated'} style={SignUpStyles.signUpCard}>
            <View style={SignUpStyles.signUpCardView}>
              <Text style={SignUpStyles.cardLoginText}>Register Account</Text>
              <TextInput
                style={[SignUpStyles.TextField, SignUpStyles.usernameTF]}
                theme={TextFieldTheme}
                label={'Username'}
                onChangeText={text => {
                  updateState({username: text});
                }}
                error={!!errorInfo.username}
              />
              {errorInfo.username ? renderError(errorInfo.username) : undefined}

              <TextInput
                style={[SignUpStyles.TextField, SignUpStyles.passwordTF]}
                secureTextEntry={true}
                right={<Icon name={'eye'} />}
                theme={TextFieldTheme}
                label={'Password'}
                onChangeText={text => {
                  updateState({password: text});
                }}
                error={!!errorInfo.password}
              />
              {errorInfo.password ? renderError(errorInfo.password) : undefined}

              <TextInput
                style={[SignUpStyles.TextField, SignUpStyles.passwordTF]}
                secureTextEntry={true}
                right={<Icon name={'eye'} />}
                theme={TextFieldTheme}
                label={'Confirm Password'}
                onChangeText={text => {
                  updateState({confirmPassword: text});
                }}
                error={!!errorInfo.confirmPassword}
              />
              {errorInfo.confirmPassword
                ? renderError(errorInfo.confirmPassword)
                : undefined}

              <TextInput
                style={[SignUpStyles.TextField, SignUpStyles.usernameTF]}
                theme={TextFieldTheme}
                label={'Email'}
                onChangeText={text => {
                  updateState({email: text});
                }}
                error={!!errorInfo.email}
              />
              {errorInfo.email ? renderError(errorInfo.email) : undefined}

              <TextInput
                style={[SignUpStyles.TextField, SignUpStyles.usernameTF]}
                theme={TextFieldTheme}
                label={'Phone'}
                onChangeText={text => {
                  updateState({phone: text});
                }}
                error={!!errorInfo.phone}
              />
              {errorInfo.phone ? renderError(errorInfo.phone) : undefined}

              <Button
                style={SignUpStyles.signUpButton}
                onPress={onSignUpButtonPress}>
                <Text style={SignUpStyles.signUpButtonText}>Register</Text>
              </Button>
            </View>
          </Card>
        </ScrollView>
      </ImageBackground>
    </View>
  );

  function onSignUpButtonPress() {
    console.log('SignUp button Pressed');
    if (
      validateFields() &&
      userInfo.username &&
      userInfo.password &&
      userInfo.email &&
      userInfo.phone
    ) {
      setLoading(true);
      SignUpRepository.signUpUser({
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        phone: userInfo.phone,
      })
        .then(() => {
          ToastAndroid.show('User account created', ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch(error => {
          error &&
            typeof error === 'string' &&
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function validateFields() {
    /** Username Validations */

    // Username cannot be blank
    updateErrorState(
      userInfo.username == null || userInfo.username === ''
        ? {username: 'Username cannot be blank!'}
        : {username: undefined},
    );

    /** Password Validations */

    // Password cannot be blank
    updateErrorState(
      userInfo.password == null || userInfo.password === ''
        ? {password: 'Password cannot be blank!'}
        : {password: undefined},
    );

    // Password must contain minimum eight characters, at least one letter and one number.
    userInfo.password &&
      updateErrorState(
        PASSWORD_REGEX.test(userInfo.password)
          ? {password: undefined}
          : {
              password:
                'Password must contain minimum 8 characters, at least 1 letter and 1 number.',
            },
      );

    /** Confirm Password Validations
     * These validations are run only when Password field passes all validations
     */

    // Confirm password cannot be blank
    updateErrorState(
      userInfo.confirmPassword == null || userInfo.confirmPassword === ''
        ? {confirmPassword: 'Confirm password cannot be blank.'}
        : {confirmPassword: undefined},
    );

    // Confirm password should match password.
    !errorInfo.password &&
      updateErrorState(
        userInfo.password === userInfo.confirmPassword
          ? {confirmPassword: undefined}
          : {confirmPassword: 'Confirm password should match password.'},
      );

    /** Email Validations */

    // Email cannot be blank
    updateErrorState(
      userInfo.email == null || userInfo.email === ''
        ? {email: 'Email cannot be blank!'}
        : {email: undefined},
    );

    // Invalid Email Format
    userInfo.email &&
      updateErrorState(
        EMAIL_REGEX.test(userInfo.email)
          ? {email: undefined}
          : {email: 'Invalid Email Format.'},
      );

    /** Phone Validations */
    // Email cannot be blank
    updateErrorState(
      userInfo.phone == null || userInfo.phone === ''
        ? {phone: 'Phone cannot be blank!'}
        : {phone: undefined},
    );

    // Invalid Email Format
    userInfo.phone &&
      updateErrorState(
        PHONE_REGEX.test(userInfo.phone)
          ? {phone: undefined}
          : {phone: 'Invalid phone number.'},
      );

    if (
      errorInfo.username ||
      errorInfo.password ||
      errorInfo.confirmPassword ||
      errorInfo.email ||
      errorInfo.phone
    ) {
      return false;
    }
    return true;
  }
}
