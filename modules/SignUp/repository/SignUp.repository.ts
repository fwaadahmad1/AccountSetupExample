import {SignUpRequestType} from '../types/SignUp.types';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export namespace SignUpRepository {
  export function signUpUser(userInfo: SignUpRequestType): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(
          `${userInfo.username}@accountSetupExample.com`,
          userInfo.password,
        )
        .then(() => {
          console.log('User account created & signed in!');
          firestore()
            .collection('Users')
            .doc(userInfo.username)
            .set(userInfo)
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              reject('Account Creation failed!');
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            reject('Email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            reject('Email address is invalid!');
          }
          console.error(error);
          reject('Account Creation failed!');
        });
    });
  }
}
