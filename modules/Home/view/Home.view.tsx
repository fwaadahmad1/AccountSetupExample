import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ToastAndroid, View} from 'react-native';
import {HomeStyles} from '../styles/Home.styles';
import {Button} from 'react-native-paper';
import {HomeRepository} from '../repository/Home.repository';

export default function HomeView({
  navigation,
}: NativeStackScreenProps<any>): JSX.Element {
  return (
    <View style={HomeStyles.baseContainer}>
      <Button
        style={HomeStyles.signOutButton}
        mode={'contained'}
        onPress={() => {
          HomeRepository.signOut()
            .then(_ => {
              ToastAndroid.show('SignOut Successful!', ToastAndroid.SHORT);
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            })
            .catch(reason => ToastAndroid.show(reason, ToastAndroid.SHORT));
        }}>
        Sign Out
      </Button>
    </View>
  );
}
