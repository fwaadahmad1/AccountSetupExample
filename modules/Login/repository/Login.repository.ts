import auth from '@react-native-firebase/auth';
import {LoginRequestType} from '../types/Login.types';

export namespace LoginRepository {
  export function loginUser(userInfo: LoginRequestType): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(
          `${userInfo.username}@accountSetupExample.com`,
          userInfo.password,
        )
        .then(() => {
          resolve(true);
          console.log('User signed in!');
        })
        .catch(error => {
          console.error(error);
          reject('Authentication failed.!');
        });
    });
  }
}
