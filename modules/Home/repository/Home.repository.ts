import auth from '@react-native-firebase/auth';

export namespace HomeRepository {
  export function signOut(): Promise<void> {
    return auth().signOut();
  }
}
