import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from '../firebase/firebase';
import { getCustomerWithMail } from "../axios/axios";
import { useNavigation } from "@react-navigation/native";
// const auth = getAuth();

const LoginScreen = () => {
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

  const handleLogin = async () => {
    await getCustomerWithMail(email).then((res) => {
      
	  if(res[0] === undefined){
      console.log("====================================x");
	  } else {
		console.log("====================================");
     	 console.log(res[0]);
		  // const password = email;
		auth.createUserWithEmailAndPassword(email.trim(), password)
		  .then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			console.log(user);
      
			navigation.push("PasswordScreen")
		  })
		  .catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(error);	
      navigation.push("PasswordScreen")
			// ..
		  });
	  }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    color: "white",
  },
  text: {
    marginTop: 10,
    color: "red",
  },
});
