import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import {auth} from "../firebase/firebase";
import { getCustomerWithMail } from "../axios/axios";
import { connect } from 'react-redux';
import { setForecastid } from "../actions";
import { bindActionCreators } from 'redux';
import { db } from "../firebase/firebase";
const Password = ({navigation, setForecastid }) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleLogin = async () => {
        auth.signInWithEmailAndPassword(email.trim(), password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            
             const customerRef = db.collection("custmast").where("Email", "==", email || email.capitalize());
    const customerMail = await customerRef.get();
    if (customerMail.empty) {
		console.log(customerMail.docs[0].data());
      setErrorMessage("No user found with this email");
      return;
    }
    const customer = customerMail.docs[0].data();
                
    setForecastid(customer.customerid);
    navigation.push("NavigationSignUp", {
      customer_id: customer.customerid,
    });
            })
            
        
        .catch((error) => {
            const errorCode = error.code;
            console.log(error);
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Enter your ID"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Enter your password"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                value={password}
            />
            <Text>{errorMessage}</Text>
            <TouchableOpacity
                    style={{
                        marginBottom:15
                    }}
                    onPress={() => navigation.push("PasswordReset")}
                >
                    <Text>Reset Password?</Text>
                </TouchableOpacity>
            <View style={styles.allbutton}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.push("SignupScreen")}
                >
                    <Text>Sign up</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: '#609BEB',
        borderRadius: 30,
        width: "80%",
        marginBottom: 10,
        padding: 15,
    },
    title: {
        fontSize: 30,
        marginBottom: 30,
        color: '#609BEB',
    },
    allbutton: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        width: "80%",
    },
    button: {
        borderWidth: 3,
		borderColor: '#609BEB',
		padding: 10,
		width: '30%',
        margin: 5,
		// textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		// color: 'white'
    },
    text: {
        marginTop: 10,
        color: "red",
    },
});
const mapStateToProps = (state) => {
	return state
  };
const mapDispatchToProps = dispatch => (
	bindActionCreators({
	  setForecastid,
	}, dispatch)
  );
export default connect(mapStateToProps,mapDispatchToProps)(Password);
