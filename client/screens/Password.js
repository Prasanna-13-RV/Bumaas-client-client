import { View, Text,StyleSheet,TextInput,TouchableOpacity } from "react-native";
import React ,{useState} from "react";
import { auth } from "../firebase/firebase";
const Password = ({navigation}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email.trim(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log(user.displayName);
        navigation.push("ProfileScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        const errorMessage = error.message;
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

export default Password;
