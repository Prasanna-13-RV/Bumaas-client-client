import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Picker,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/firebase";
const Actual_Forecast_Stock = () => {
  const [singleforecast, setSingleForecast] = useState("");
  const [forecasts, setForecasts] = useState([]);
  const [forecastid, setForecastid] = useState("");
  const forecastRef = db.collection("Forecast");
  useEffect(async () => {
    
    const forecast = await forecastRef.get();
    console.log(forecast.docs[0].data());
    setForecasts(forecast.docs.map((doc) => doc.data()));
  }, []);
  const navigation = useNavigation();

  const actual_stock_schema = Yup.object().shape({
    actual_stock_quantity: Yup.number().required(),
  });

  const image = { uri: "https://wallpaperaccess.com/full/3966936.jpg" };
  const [description, setDescription] = useState("");
  const [actualstockquantity, setActualstockquantity] = useState("");
  const [weeklyconsumption, setWeeklyconsumption] = useState("");
  const handleForecastCahnge = async (itemValue) => {
    console.log(itemValue);
    const forecastSingleRef = await db
      .collection("Forecast")
      .where("Forecastid", "==", itemValue);
    const forecast = await forecastSingleRef.get();
    console.log(forecast);
    setSingleForecast(forecast.docs[0].data());
  };
  return (
    <>
     
     <LinearGradient
              style={styles.image}
              start={[0, 1]}
              end={[1, 0]}
              colors={["#FF8489", "#D5ADC8"]}
            >
      <Formik
        initialValues={{
          actual_stock_quantity: "",
        }}
        // validationSchema={}
        onSubmit={ async (values) => {
          
          console.log(values);
          try {
            if(values.actual_stock_quantity !== "") {
             

            
            console.log("dd00", values);
            await db.collection("Forecast").doc(forecastid).update({
              actual_production: values.actual_stock_quantity,
            });
            console.log(orderno, "no");
            const orderno = forecastid.split("_")[1];
            console.log(orderno);
            await db.collection("orders").doc(`Order_${orderno}`).update({
              actual_production: values.actual_stock_quantity,
            });
            ToastAndroid.show("Successfully Added", ToastAndroid.SHORT)
          }else {
            ToastAndroid.show("Invalid data. Please try again", ToastAndroid.SHORT)
          }
          } catch (error) {
            console.log(error,'err');
            ToastAndroid.show("Invalid data. Please try again", ToastAndroid.SHORT)
            
          }
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <ScrollView>
            
              <View style={styles.container}>
                <View style={styles.sub_container}>
                  <View style={styles.elevator}>
                    <Text style={styles.text}>Forecast ID</Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "white",
                      // backgroundColor: "#ffffff8d",
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                      width: "100%",
                      // marginTop: 10,
                    }}
                  >
                    <Picker
                      selectedValue={forecastid}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        setForecastid(itemValue);
                        handleForecastCahnge(itemValue);
                      }}
                    >
                      {forecasts.map((forecast) => (
                        <Picker.Item
                          style={styles.picker}
                          label={forecast.Forecastid}
                          value={forecast.Forecastid}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.sub_container}>
                  <View style={styles.elevator}>
                    <Text style={styles.text}>Project Name</Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder=""
                    value={singleforecast ? singleforecast.Projectname : ""}
                  />
                </View>

                <View style={styles.sub_container}>
                  <View style={styles.elevator}>
                    <Text style={styles.text}>Actual Production</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Actual Stock Number"
                    onChangeText={handleChange("actual_stock_quantity")}
                    onBlur={handleBlur("actual_stock_quantity")}
                  />
                </View>
                <View style={styles.sub_container}>
                  <View style={styles.elevator}>
                    <Text style={styles.text}>remarks</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={singleforecast ? singleforecast.Remarks : ""}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={{ color: "white" }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </ScrollView>
        )}
      </Formik>
        </LinearGradient>
    </>
  );
};

export default Actual_Forecast_Stock;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  sub_container: {
    // flex: 1,
    width: "90%",
    // backgroundColor: "#fff",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  elevator: {
    elevation: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: "100%",
  },
  text: {
    fontSize: 15,
    elevation: 10,
    padding: 15,
    // fontWeight: "bold",
    // marginTop: 10,
    color: "black",
  },
  picker: {
    width: "100%",
    height: 50,
    color: "black",
    fontSize: 15,
    backgroundColor: "white",
    // marginBottom: 10,
  },
  textarea: {
    width: "100%",
    height: 100,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ffaa00",
    borderRadius: 5,
    fontSize: 13,
    textAlignVertical: "top",
  },
  input: {
    width: "100%",
    height: 50,
    // margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    fontSize: 13,
  },
  button: {
    width: "100%",
    // height: 50,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 13,
    // backgroundColor: "w",
    color: "#fff",
  },
});
