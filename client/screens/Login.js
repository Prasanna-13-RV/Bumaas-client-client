import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import {auth} from "../firebase/firebase";
const Password = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email.trim(), password)
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
            />
            <TextInput
                placeholder="Enter your password"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Text>{errorMessage}</Text>
            <View style={styles.allbutton}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.push("LoginScreen")}
                >
                    <Text style={styles.button}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.push("PasswordReset")}
                >
                    <Text style={styles.button}>Reset Password?</Text>
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
        borderColor: "black",
        width: "80%",
        marginBottom: 10,
        padding: 10,
    },
    title: {
        fontSize: 30,
        marginBottom: 10,
    },
    allbutton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        width: "80%",
    },
    button: {
        backgroundColor: "blue",
        padding: 5,
        margin: 2,
        // borderRadius: 10,
        color: "white",
    },
    text: {
        marginTop: 10,
        color: "red",
    },
});

export default Password;
