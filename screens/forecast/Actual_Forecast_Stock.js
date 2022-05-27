import {
  StyleSheet,
  Text,
  View,
  Picker,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/firebase";
const Actual_Forecast_Stock = () => {
	const [singleforecast, setSingleForecast] = useState('');
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
	const forecastSingleRef = await db.collection("Forecast").where("Forecastid", "==", itemValue);
	const forecast = await forecastSingleRef.get();
	console.log(forecast);
	setSingleForecast(forecast.docs[0].data());

  }
  return (
    <><ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Formik
        initialValues={{
         
          actual_stock_quantity: "",
          
        }}
        // validationSchema={}
        onSubmit={async (values) => {
			console.log('dd00',values)
			await db.collection("Forecast").doc(forecastid).update({
				actual_production: values.actual_stock_quantity,
			});

        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.sub_container}>
                <Text style={styles.text}>Forecast ID</Text>
                <View style={{
                   borderWidth: 1,
                   borderColor: "#ddd",
                   borderRadius: 5,
                   width: '100%',
                   marginTop:10
                }}>
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
                <Text style={styles.text}>Project Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  value={singleforecast ? singleforecast.Projectname : ""}
                  
                />
              </View>
              
              <View style={styles.sub_container}>
                <Text style={styles.text}>Actual Production</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Actual Stock Number"
                  onChangeText={handleChange("actual_stock_quantity")}
                  onBlur={handleBlur("actual_stock_quantity")}
                />
              </View>
              <View style={styles.sub_container}>
                <Text style={styles.text}>remarks</Text>
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
      </Formik></ImageBackground>
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: 'white'
  },
  picker: {
    width: "100%",
    height: 40,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
   
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
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 13,
  },
  button: {
    width: "100%",
    // height: 50,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical:10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 13,
    // backgroundColor: "w",
    color: "#fff",
  },
});
