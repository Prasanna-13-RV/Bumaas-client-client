import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { getCustomerWithMail } from "../axios/axios";
import { useNavigation } from "@react-navigation/native";
// const auth = getAuth();
import { db } from "../firebase/firebase";
import { connect } from 'react-redux';
import { setForecastid } from "../actions";
import { bindActionCreators } from 'redux';
const LoginScreen = ({ setForecastid }) => {
  // useEffect(() => {
  // 	const unsubscribe  = auth.onAuthStateChanged((user) => {
  // 		if (user) {
  // 			navigation.push('ProfileScreen');
  // 		}
  // 	});
  // 	return unsubscribe;
  // } , []);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const customerRef = db.collection("custmast").where("Email", "==", email.trim());
    const customerMail = await customerRef.get();
    if (customerMail.empty) {
		console.log(customerMail.docs[0].data());
      setErrorMessage("No user found with this email");
      return;
    }
    const customer = customerMail.docs[0].data();
    auth
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((userCredential) => {
        
        const user = userCredential.user;
        console.log(user);
		console.log(customer);
		setForecastid(customer.customerid);
        navigation.push("NavigationSignUp", {
          customer_id: customer.customerid,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setErrorMessage(errorMessage);
        if (
          errorMessage ==
          "The email address is already in use by another account."
        ) {
          navigation.push("PasswordScreen");
        }
      });

    // await getCustomerWithMail(email).then((res) => {
    //   if (res[0] === undefined) {
    //     setErrorMessage("Email not found");
    //   } else {
    //     console.log("insider");
    //     // const password = email;
    //     auth
    //       .createUserWithEmailAndPassword(email.trim(), password)
    //       .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         console.log(user);

    //         navigation.push("ProfileScreen", {
    //           customer_id: res[0].customer_id,
    //         });
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(error);
    //         setErrorMessage(errorMessage);
    //         if (
    //           errorMessage ==
    //           "The email address is already in use by another account."
    //         ) {
    //           navigation.push("PasswordScreen");
    //         }
    //       });
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Enter your ID"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Text>{errorMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
	return state
  };
const mapDispatchToProps = dispatch => (
	bindActionCreators({
	  setForecastid,
	}, dispatch)
  );

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#609BEB",
    width: "80%",
    borderRadius: 30,
    marginBottom: 10,
    padding: 15,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    color: "#609BEB",
  },
  button: {
    borderWidth: 3,
    borderColor: "#609BEB",
    padding: 10,
    width: "30%",
    margin: 5,
    color: "black",
    // textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    marginTop: 10,
    color: "red",
  },
});
