import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser,faRectangleList,faWarehouse,faCalculator,faBoxesStacked,faChartColumn} from '@fortawesome/free-solid-svg-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from "./screens/SignupScreen";
import forecastList from "./screens/forecast/forecastList";
import OrderList from "./screens/forecast/OrderList";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Forecast from "./screens/forecast/Forecast";
import Reports from "./screens/forecast/Reports";
import Actual_Forecast_Stock from "./screens/forecast/Actual_Forecast_Stock";
import Reports_Forecast from "./screens/forecast/Reports_Forecast";
import Reports_Orders from "./screens/forecast/Reports_Orders";
import ShowProjects from "./screens/reports/showProjects";
import Password from "./screens/Login";
import PasswordReset from "./screens/PasswordReset";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
};
const foecastStack = () => {
  return (
      <Stack.Navigator screenOptions={screenOptions}>

          <Stack.Screen   name="Forecastscreen"
                      component={Forecast}>

          </Stack.Screen>
          
          
      </Stack.Navigator>
  )
}

const reportStack = () => {
  return (
      <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen   name="Reports"
                      component={Reports}>

          </Stack.Screen>
          
          <Stack.Screen   name="Reports_Forecast"
                      component={Reports_Forecast}>

          </Stack.Screen>
          <Stack.Screen   name="Reports_Orders"
                      component={Reports_Orders}>

          </Stack.Screen>
          <Stack.Screen   name="forecastList"
                      component={forecastList}>

          </Stack.Screen>
          <Stack.Screen   name="OrderList"
                      component={OrderList}>

          </Stack.Screen>
          
      </Stack.Navigator>
  )
}
const NavigationSignUp = () => {
  return (
      <>
          
              <Tab.Navigator
                  style={ { height: 90, borderTopWidth: 0, elevation: 0,
                 }}
                  screenOptions={({ route }) => ({
                      tabBarStyle:{
                          backgroundColor:'white',
                            borderTopWidth: 0,
                            elevation: 0,
                            height: 55,
                            paddingBottom: 10,
                      },
                      tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                          let icons;
                        if (route.name === 'Forecast') {
                          iconName = focused
                            ? icons = faCalculator
                            : icons = faCalculator;
                        } 
                        if (route.name === 'Actual stock') {
                          iconName = focused
                            ? icons = faBoxesStacked
                            : icons = faBoxesStacked;
                        } 
                        if (route.name === 'Reports') {
                          iconName = focused
                            ? icons = faChartColumn
                            : icons = faChartColumn;
                        } 
            
                        // You can return any component that you like here!
                        return <FontAwesomeIcon icon={ icons} />;
                      },
                      tabBarActiveTintColor: 'black',
                      tabBarInactiveTintColor: 'gray',
                    })}
              >
      {/* <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={screenOptions}
      /> */}
                  {/* <Stack.Screen
                      name="LoginScreen"
                      component={LoginScreen}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="Forgot"
                      component={Forgot}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="RegisterScreen"
                      component={RegisterScreen}
                      options={screenOptions}
                  /> */}
                  <Tab.Screen
                      name="Forecast"
                      component={foecastStack}
                      options={screenOptions}
                  />
                  
                  <Tab.Screen
                      name="Actual stock"
                      component={Actual_Forecast_Stock}
                      options={screenOptions}
                  />
                  <Tab.Screen
                      name="Reports"
                      component={reportStack}
                      options={screenOptions}
                  />
                  {/* <Stack.Screen
                      name="ShowCustomer"
                      component={ShowCustomer}
                      options={screenOptions}
                  /> */}
                  {/* <Stack.Screen
                      name="ShowAllCustomer"
                      component={ShowAllCustomer}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="ShowProject"
                      component={ShowProject}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="CustomerUpdate"
                      component={CustomerUpdate}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="ProjectUpdate"
                      component={ProjectUpdate}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="InventoryUpdate"
                      component={InventoryUpdate}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="Itemmaster"
                      component={Itemmaster}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="ItemMasterUpdate"
                      component={ItemMasterUpdate}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="IndViewItemMaster"
                      component={IndViewItemMaster}
                      options={screenOptions}
                  />
                  <Stack.Screen
                      name="ViewItemMaster"
                      component={ViewItemMaster}
                      options={screenOptions}
                  /> */}
              </Tab.Navigator>
          
      </>
  );
};

export default NavigationSignUp;

const styles = StyleSheet.create({});
