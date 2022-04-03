import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Picker,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { projectCreate, projectGet } from "../../axios/axios";
const Forecast = ({ route }) => {
  const navigation = useNavigation();
  const [project, setProject] = useState([]);
  const [name, setName] = useState("");
  useEffect(async () => {
		await projectGet(route.params.customer_id).then((res) => {
			setProject(res);
			console.log(res);
		});
	}, []);
  const [dropdown, setDropdown] = useState();
  const [noOfMonths, setNoOfMonths] = useState([1, 2, 3]);
  const [dropdownMonths, setDropdownMonths] = useState(1);
  const [initialFormValues, setInitialFormValues] = useState({});
  const [forecast, setForecast] = useState("");
  const [type, setType] = useState("");

  const [slide, setSlide] = useState(false);

  let forecast_type_schema = yup.object().shape({
    forecast_type: yup.string().required(),
    no_of_months: yup.number().required(),
  });

  const handleNoOfMonthsChange = (value) => {
    const arr = [];
    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }
    setNoOfMonths(arr);
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

  return (
    <Formik
      initialValues={initialFormValues}
      // validationSchema={forecast_type_schema}
      validateOnMount={true}
      onSubmit={async (values) => {
        await projectCreate(values,route.params.customer_id).then((res) => {
          console.log(res.data);
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
                  <Picker
                    style={styles.picker}
                    selectedValue={dropdown}
                    onValueChange={(itemValue, itemIndex) => {
                      setDropdown(itemValue);
                      setType(itemValue);
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
                  {dropdown == "monthly" ? (
                    <>
                      <Text style={styles.text}>Forecast Type</Text>
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
                 
                  <Picker
                    style={{ width: "100%" }}
                    mode="dropdown"
                    placeholder="Forecast Project Name"
                    onValueChange={
                      handleChange("forecast_name") 
                      
                    }
                    
                    selectedValue={values.forecast_name}
                  >
                    <Picker.Item label="Select Type" value=""  />
                    {
                      project.length > 0 ? console.log(project) : null
                    }
                    {project.length > 0 && project.map((it) => (
                      <Picker.Item label={it.project_name} value={it.project_name} />
                    ))}
                  </Picker>
                </View>

                {noOfMonths.map((month, index) => {
                  return (
                    <View style={styles.sub_container}>
                      <Text style={styles.text}>Month {month}</Text>
                      <TextInput
                        style={styles.text_input}
                        onChangeText={handleChange(`forecast_month${month}`)}
                        onBlur={handleBlur(`forecast_month${month}`)}
                        value={values[`forecast_month${month}`]}
                        placeholder={`Forecast Month ${month}`}
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
  );
};

export default Forecast;

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: "bold",
  },
  text_input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  picker: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
  },
  picker_item: {
    height: 40,
    width: "100%",
  },
  button: {
    width: "100%",
    height: 40,
    color: "white",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  box: {
    width: "100%",
    height: 40,
    borderColor: "gray",
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
    borderColor: "#ddd",
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
