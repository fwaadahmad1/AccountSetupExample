import React, {useState} from 'react';
import {Image, ImageBackground, Text, ToastAndroid, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoginStyles} from '../styles/Login.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Button,
  Card,
  HelperText,
  TextInput,
} from 'react-native-paper';
import {TextFieldTheme} from '../../common/styles/TextFieldTheme';
import {LoginFieldsState} from '../types/Login.types';
import {SignUpFieldsState} from '../../SignUp/types/SignUp.types';
import {LoginRepository} from '../repository/Login.repository';

export default function LoginView({
  navigation,
}: NativeStackScreenProps<any>): JSX.Element {
  const [loginInfo, setLoginInfo] = useState<LoginFieldsState>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<LoginFieldsState>({});

  function updateState(userInfoObj: SignUpFieldsState) {
    setLoginInfo(prevState => {
      return {...prevState, ...userInfoObj};
    });
  }

  function updateErrorState(userInfoObj: LoginFieldsState) {
    setErrorInfo(prevState => {
      return {...prevState, ...userInfoObj};
    });
  }

  function renderError(error: string): JSX.Element {
    return (
      <HelperText style={LoginStyles.errorTextStyle} type={'error'}>
        {error}
      </HelperText>
    );
  }

  return (
    <View style={LoginStyles.baseContainer}>
      <ImageBackground
        source={require('./../../../resources/images/background.png')}
        style={LoginStyles.backgroundImage}>
        {loading ? (
          <ActivityIndicator
            style={LoginStyles.loader}
            size={'large'}
            animating={true}
            color={'#1450A9'}
          />
        ) : undefined}
        <Image
          style={LoginStyles.logo}
          source={require('./../../../resources/images/logo.png')}
        />
        <Card mode={'elevated'} style={LoginStyles.loginCard}>
          <View style={LoginStyles.loginCardView}>
            <Text style={LoginStyles.cardLoginText}>Login Account</Text>
            <TextInput
              style={[LoginStyles.TextField, LoginStyles.usernameTF]}
              theme={TextFieldTheme}
              label={'Username'}
              onChangeText={text => updateState({username: text})}
              error={!!errorInfo.username}
            />
            {errorInfo.username ? renderError(errorInfo.username) : undefined}

            <TextInput
              style={[LoginStyles.TextField, LoginStyles.passwordTF]}
              secureTextEntry={true}
              right={<Icon name={'eye'} />}
              theme={TextFieldTheme}
              label={'Password'}
              onChangeText={text => updateState({password: text})}
              error={!!errorInfo.password}
            />
            {errorInfo.password ? renderError(errorInfo.password) : undefined}

            <Button style={LoginStyles.loginButton} onPress={loginButtonPress}>
              <Text style={LoginStyles.loginButtonText}>Login</Text>
            </Button>
          </View>
        </Card>

        <View style={LoginStyles.signUpView}>
          <Text style={[LoginStyles.signUpText]}>Don't have an account?</Text>
          <Button
            style={LoginStyles.signUpButton}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={LoginStyles.signUpButtonText}>Register</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );

  function loginButtonPress() {
    if (validateFields() && loginInfo.username && loginInfo.password) {
      setLoading(true);
      LoginRepository.loginUser({
        username: loginInfo.username,
        password: loginInfo.password,
      })
        .then(_ => {
          ToastAndroid.show('Login Successful!', ToastAndroid.SHORT);
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        })
        .catch(reason =>
          ToastAndroid.show(
            reason ?? 'Authentication Failure!',
            ToastAndroid.SHORT,
          ),
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function validateFields(): boolean {
    /** Username Validations */

    // Username cannot be blank
    updateErrorState(
      loginInfo.username == null || loginInfo.username === ''
        ? {username: 'Username cannot be blank!'}
        : {username: undefined},
    );

    /** Password Validations */

    // Password cannot be blank
    updateErrorState(
      loginInfo.password == null || loginInfo.password === ''
        ? {password: 'Password cannot be blank!'}
        : {password: undefined},
    );

    if (errorInfo.username || errorInfo.password) {
      return false;
    }
    return true;
  }
}
