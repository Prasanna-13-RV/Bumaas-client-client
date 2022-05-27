import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import configureStore from "./store";
import NavigationSignUp from "./navigation";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import Login from './screens/Login';
import SignupScreen from "./screens/SignupScreen";
export default function App() {
  const store = configureStore()
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Provider store={store}>
      <NavigationContainer
              
             
          >
      {/* <NavigationSignUp /> */}
      <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen   name="LoginScreen"
                      component={Login}>

          </Stack.Screen>
          
          <Stack.Screen   name="SignupScreen"
                      component={SignupScreen}>

          </Stack.Screen>
          <Stack.Screen   name="NavigationSignUp"
                      component={NavigationSignUp}>

          </Stack.Screen>
          
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
