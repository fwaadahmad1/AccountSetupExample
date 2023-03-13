import React, {useCallback, useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginView from './modules/Login/view/Login.view';
import SignUpView from './modules/SignUp/view/SignUp.view';
import HomeView from './modules/Home/view/Home.view';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const RootStack = createNativeStackNavigator();
function App(): JSX.Element | null {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
          <RootStack.Screen
            name={'Login'}
            component={LoginView}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen name={'Home'} component={HomeView} />
          <RootStack.Screen
            name={'SignUp'}
            component={SignUpView}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;
