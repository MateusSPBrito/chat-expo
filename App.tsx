import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/login';
import Chat from './src/screens/chat';
import creatLogin from './src/screens/creatLogin';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="creatLogin" component={creatLogin}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Chat" component={Chat}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

