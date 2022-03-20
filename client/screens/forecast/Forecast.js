import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Picker,
    TouchableOpacity,
} from "react-native";
import React, {useState, useEffect} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigation} from "@react-navigation/native";

const Forecast = () => {
    const navigation = useNavigation();

    const [dropdown, setDropdown] = useState("select_something");
    const [forecast, setForecast] = useState("");

    const [slide, setSlide] = useState(false);

    let forecast_type_schema = yup.object().shape({
        forecast_type: yup.string().required(),
        no_of_months: yup.number().required(),
    });

    return (
        <Formik
            initialValues={{
                forecast_type: "",
                no_of_months: "",
                forecast_name: "",
                forecast_month1: "",
                forecast_month2: "",
                forecast_month3: "",
                remarks: "",
            }}
            validationSchema={forecast_type_schema}
            validateOnMount={true}
            onSubmit={(values) => {
                console.log(values, "values");
            }}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                <ScrollView>
                    <>
                        <View style={styles.container}>
                            <View
                                style={[
                                    styles.next_container,
                                    styles.left_container,
                                ]}
                            >
                                <View style={styles.sub_container}>
                                    <Text style={styles.text}>
                                        Forecast Form
                                    </Text>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={dropdown}
                                        onValueChange={(
                                            itemValue,
                                            itemIndex
                                        ) => {
                                            setDropdown(itemValue);
                                        }}
                                    >
                                        <Picker.Item
                                            style={styles.picker_item}
                                            label="Select Any One"
                                            value="select_something"
                                        />
                                        <Picker.Item
                                            style={styles.picker_item}
                                            label="Monthly"
                                            value="monthly"
                                        />
                                        <Picker.Item
                                            style={styles.picker_item}
                                            label="Quaterly"
                                            value="quaterly"
                                        />
                                    </Picker>
                                    {dropdown == "monthly" ? (
                                        <View style={styles.sub_container}>
                                            <Text style={styles.text}>
                                                No of Months
                                            </Text>
                                            <TextInput
                                                style={styles.text_input}
                                                onChangeText={handleChange(
                                                    "no_of_months"
                                                )}
                                                onBlur={handleBlur(
                                                    "no_of_months"
                                                )}
                                                value={values.no_of_months}
                                                placeholder="Enter no of months"
                                            ></TextInput>
                                        </View>
                                    ) : null}
                                </View>
                                <View style={styles.sub_container}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            console.log(values, "values");
                                        }}
                                    >
                                        <Text style={{color: "white"}}>
                                            Next Button
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.next_container,
                                    styles.right_container,
                                ]}
                            >
                                <View style={styles.sub_container}>
                                    <Text style={styles.text}>Forecast ID</Text>
                                    <Text style={styles.box}>123456789</Text>
                                </View>
                                <View style={styles.sub_container}>
                                    <Text style={styles.text}>
                                        Project Name
                                    </Text>
                                    <TextInput
                                        style={styles.text_input}
                                        onChangeText={handleChange(
                                            "forecast_name"
                                        )}
                                        onBlur={handleBlur("forecast_name")}
                                        value={values.forecast_name}
                                        placeholder="Forecast Project Name"
                                    />
                                </View>
                                <View style={styles.sub_container}>
                                    <Text style={styles.text}>Month 1</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        onChangeText={handleChange(
                                            "forecast_month1"
                                        )}
                                        onBlur={handleBlur("forecast_month1")}
                                        value={values.forecast_month1}
                                        placeholder="Forecast Month 1"
                                    />
                                </View>
                                <View style={styles.sub_container}>
                                    <Text style={styles.text}>Month 2</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        onChangeText={handleChange(
                                            "forecast_month2"
                                        )}
                                        onBlur={handleBlur("forecast_month2")}
                                        value={values.forecast_month2}
                                        placeholder="Forecast Month 2"
                                    />
                                </View>
                                <View style={styles.sub_container}>
                                    <Text style={styles.text}>Month 3</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        onChangeText={handleChange(
                                            "forecast_month3"
                                        )}
                                        onBlur={handleBlur("forecast_month3")}
                                        value={values.forecast_month3}
                                        placeholder="Forecast Month 3"
                                    />
                                </View>
                                <View style={styles.sub_container}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            console.log(values, "values");
                                            handleSubmit();
                                            navigation.push("ProfileScreen");
                                        }}
                                    >
                                        <Text style={{color: "white"}}>
                                            Submit
                                        </Text>
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
    left_container: {
        left: 0,
        position: "absolute",
        top: "50%",
    },
    right_container: {
        left: "100%",
    },
});
