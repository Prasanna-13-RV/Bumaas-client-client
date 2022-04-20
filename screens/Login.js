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
const Password = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleLogin = async () => {
        auth.signInWithEmailAndPassword(email.trim(), password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            
            await getCustomerWithMail(email).then((res)=> {
                
                    navigation.push("ProfileScreen", {
                        customer_id: res[0].customer_id,
                    });
                
                
            })
            .catch(error => console.log(error))
            
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
                    onPress={() => navigation.push("LoginScreen")}
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

export default Password;
