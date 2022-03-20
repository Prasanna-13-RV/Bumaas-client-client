import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Forecast from "./screens/forecast/Forecast";
import Reports from "./screens/forecast/Reports";
import Actual_Forecast_Stock from "./screens/forecast/Actual_Forecast_Stock";
import Reports_Forecast from "./screens/forecast/Reports_Forecast";
import Reports_Orders from "./screens/forecast/Reports_Orders";
const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

const NavigationSignUp = () => {
    return (
        <>
            <NavigationContainer
                initialRouteName="Reports_Forecast"
                screenOptions={screenOptions}
            >
                <Stack.Navigator>
                    <Stack.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Forecast"
                        component={Forecast}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Actual_Forecast_Stock"
                        component={Actual_Forecast_Stock}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Reports"
                        component={Reports}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Reports_Forecast"
                        component={Reports_Forecast}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Reports_Orders"
                        component={Reports_Orders}
                        options={screenOptions}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default NavigationSignUp;

const styles = StyleSheet.create({});
