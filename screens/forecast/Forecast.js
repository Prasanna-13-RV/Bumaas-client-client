import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Picker,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
const image = { uri: "https://wallpaperaccess.com/full/3966936.jpg" };
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { forecastGet, projectCreate, projectGet } from "../../axios/axios";
import { db } from "../../firebase/firebase";
const Forecast = ({ route, forecastid }) => {
  const navigation = useNavigation();
  const [project, setProject] = useState([]);
  const [projectname, setProjectname] = useState("");
  const [month, setMonth] = useState(null);
  const [name, setName] = useState("");
  const forecastGet = db.collection("Forecast");
  const orderGet = db.collection("orders");
  useEffect(async () => {
    console.log(forecastid);
    const projectRef = db
      .collection("projects")
      .where("customerid", "==", forecastid.forecastid);
    const proj = await projectRef.get();
    console.log(proj.docs[0].data());
    setProject(proj.docs.map((doc) => doc.data()));
    // await projectGet(route.params.customerid).then((res) => {
    // 	setProject(res);
    // 	console.log(res);
    // });
  }, [dropdown, forecastid, month]);
  const [dropdown, setDropdown] = useState();
  const [noOfMonths, setNoOfMonths] = useState([1, 2, 3]);
  const [dropdownMonths, setDropdownMonths] = useState(1);
  const [initialFormValues, setInitialFormValues] = useState({
    forecast_name: "",
  });
  const [forecast, setForecast] = useState("");
  const [type, setType] = useState("");

  const [slide, setSlide] = useState(false);

  let forecast_type_schema = yup.object().shape({
    forecast_type: yup.string().required(),
    no_of_months: yup.number().required(),
  });
  const handleType = (itemValue) => {
    if (itemValue == "quaterly") {
      setNoOfMonths([1, 2, 3]);
    }
  };
  const handleNoOfMonthsChange = (value) => {
    const arr = [];
    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }
    setNoOfMonths(arr);
    console.log(type);
  };

  class InitialFormValuesClass {
    constructor(months = 1) {
      this.forecast_name = "";

      this.remarks = "";
      for (let i = 0; i < months; i++) {
        this[`forecast_month${i}`] = "";
      }
    }
  }

  const monthData = [
    {
      month: "January",
      value: 1,
    },
    {
      month: "February",
      value: 2,
    },
    {
      month: "March",
      value: 3,
    },
    {
      month: "April",
      value: 4,
    },
    {
      month: "May",
      value: 5,
    },

    {
      month: "June",
      value: 6,
    },
    {
      month: "July",
      value: 7,
    },

    {
      month: "August",
      value: 8,
    },
    {
      month: "September",
      value: 9,
    },

    {
      month: "October",

      value: 10,
    },
    {
      month: "November",
      value: 11,
    },

    {
      month: "December",

      value: 12,
    },
  ];

  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Formik
          initialValues={initialFormValues}
          // validationSchema={forecast_type_schema}
          validateOnMount={true}
          onSubmit={async (values) => {
            // await projectCreate(values,route.params.customer_id).then((res) => {
            //   console.log(res.data);
            // });
            console.log(values);
            const random = Math.random(10)
              .toString()
              .split(".")[1]
              .slice(0, 10);
            const unique_id = `Forecast_${random}`;
            const order_id = `Order_${random}`;
            const months = Object.keys(values).filter((key) =>
              key.includes("forecast_month")
            );
            await forecastGet.doc(unique_id).set({
              Forecastid: unique_id,
              customerid: forecastid.forecastid,
              Projectname: projectname,
              Remarks: values.remarks,
              StartingMonth: monthData[month-1].value,
              Qtm: months.map((month) => values[month]),
              TimeStamp: new Date().toISOString()
            });
            await orderGet.doc(order_id).set({
              orderid: order_id,
              customerid: forecastid.forecastid,
              Projectname: projectname,
              Remarks: values.remarks,
               StartingMonth: monthData[month-1].value,
              Qtm: months.map((month) => values[month]),
              ShippingQuantity: 0,
              Status: "Pending",
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <ScrollView>
              <>
                <View style={styles.container}>
                  <View style={[styles.next_container, styles.left_container]}>
                    <View style={styles.sub_container}>
                      <Text style={styles.text}>Forecast Form</Text>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 30,
                          marginTop: 10,
                        }}
                      >
                        <Picker
                          style={styles.picker}
                          selectedValue={dropdown}
                          onValueChange={(itemValue, itemIndex) => {
                            setDropdown(itemValue);
                            setType(itemValue);
                            handleType(itemValue);
                          }}
                        >
                          <Picker.Item
                            style={styles.picker_item}
                            label="Quaterly"
                            value="quaterly"
                          />
                          <Picker.Item
                            style={styles.picker_item}
                            label="Monthly"
                            value="monthly"
                          />
                        </Picker>
                      </View>
                      {dropdown == "monthly" ? (
                        <>
                          <Text style={styles.text}>Forecast Type</Text>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: "white",
                              borderRadius: 30,
                              marginTop: 10,
                            }}
                          >
                            <Picker
                              style={styles.picker}
                              selectedValue={dropdownMonths}
                              onValueChange={(itemValue, itemIndex) => {
                                handleNoOfMonthsChange(parseInt(itemValue));
                                setDropdownMonths(parseInt(itemValue));

                                console.log(itemValue, "itemValue");
                                const initial = new InitialFormValuesClass(
                                  parseInt(itemValue)
                                );
                                setInitialFormValues(initial);
                                console.log(type);
                              }}
                            >
                              <Picker.Item
                                style={styles.picker_item}
                                label="1"
                                value="1"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="2"
                                value="2"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="3"
                                value="3"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="4"
                                value="4"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="5"
                                value="5"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="6"
                                value="6"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="7"
                                value="7"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="8"
                                value="8"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="9"
                                value="9"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="10"
                                value="10"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="11"
                                value="11"
                              />
                              <Picker.Item
                                style={styles.picker_item}
                                label="12"
                                value="12"
                              />
                            </Picker>
                          </View>
                        </>
                      ) : null}
                    </View>
                    {/* <View style={styles.sub_container}>
									<TouchableOpacity
										style={styles.button}
										onPress={() => {
											console.log(values, 'values');
										}}
									>
										<Text style={{ color: 'white' }}>Next Button</Text>
									</TouchableOpacity>
								</View> */}
                  </View>
                  <View style={[styles.next_container, styles.right_container]}>
                    <View style={styles.sub_container}>
                      <Text style={styles.text}>Project Name</Text>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 30,
                          marginTop: 10,
                        }}
                      >
                        <Picker
                          style={{ width: "100%" }}
                          mode="dropdown"
                          placeholder="Forecast Project Name"
                          onValueChange={(itemValue) =>
                            setProjectname(itemValue)
                          }
                          selectedValue={projectname ? projectname : null}
                        >
                          <Picker.Item label="Select Project" value="" />

                          {project.length > 0 &&
                            project.map((it) => (
                              <Picker.Item
                                label={it.Projectname}
                                value={it.Projectname}
                              />
                            ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.sub_container}>
                      <Text style={styles.text}>Pick Month 1</Text>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 30,
                          marginTop: 10,
                        }}
                      >
                      <Picker
                        style={{ width: "100%" }}
                        mode="dropdown"
                        placeholder="Forecast Project Name"
                        onValueChange={(itemValue) => setMonth(itemValue)}
                        selectedValue={projectname ? projectname : null}
                      >
                        <Picker.Item label="Select month 1" value="" />
                        {monthData.map((it, index) => (
                          <Picker.Item label={it.month} value={it.value} />
                        ))}
                      </Picker></View>
                    </View>
                    {month != null && noOfMonths.map((months, index) => {
                        return (
                          <View style={styles.sub_container}>
                            <Text style={styles.text}>
                              Month {monthData[month + index - 1].month}
                            </Text>
                            <TextInput
                              style={styles.text_input}
                              onChangeText={handleChange(
                                `forecast_month${index}`
                              )}
                              onBlur={handleBlur(`forecast_month${index}`)}
                              value={values[`forecast_month${index}`]}
                              placeholder={`Forecast Month${index}`}
                            />
                          </View>
                        );
                      })}
                    <View style={styles.sub_container}>
                      <Text style={styles.text}>Remarks</Text>
                      <TextInput
                        style={styles.textarea}
                        onChangeText={handleChange("remarks")}
                        onBlur={handleBlur("remarks")}
                        value={values.remarks}
                        placeholder="Remarks"
                      />
                    </View>
                    <View style={styles.sub_container}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          handleSubmit();
                          console.log(values);
                        }}
                      >
                        <Text style={{ color: "white" }}>Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            </ScrollView>
          )}
        </Formik>
      </ImageBackground>
    </>
  );
};
const mapStateToProps = (state) => {
  const { forecastid } = state;
  console.log("====================================");
  console.log(forecastid, "sss");
  console.log("====================================");
  return { forecastid };
};
export default connect(mapStateToProps)(Forecast);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    // justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    flex: 1,
    // left: 0,
    marginTop: 50,
    marginBottom: 50,
  },
  next_container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // top: "50%",
  },
  sub_container: {
    width: "90%",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  text_input: {
    width: "100%",
    height: 60,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10,
    padding: 15,
    borderRadius: 30,
  },
  picker: {
    width: "100%",
    height: 40,
    // marginTop: 10,
  },
  picker_item: {
    height: 40,
    width: "100%",
  },
  button: {
    width: "50%",
    height: 50,
    color: "black",
    borderColor: "white",
    borderWidth: 3,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 30,
  },
  box: {
    width: "100%",
    height: 40,
    borderColor: "#ffaa00",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  textarea: {
    // width: "100%",
    height: 100,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    fontSize: 13,
    textAlignVertical: "top",
  },
  // left_container: {
  //     left: 0,
  //     position: "absolute",
  //     top: "50%",
  // },
  // right_container: {
  //     left: "100%",
  // },
});
