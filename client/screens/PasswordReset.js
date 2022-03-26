import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import {auth} from "../firebase/firebase";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleReset = () => {
        auth.sendPasswordResetEmail(email.trim())
            .then(() => {
                setErrorMessage("Password reset email sent");
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error);
                setErrorMessage(errorMessage);
            });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Password Reset</Text>
            <TextInput
                placeholder="Enter your password"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Text>{errorMessage}</Text>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};
export default PasswordReset;
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
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignContent: "center",
        justifyContent: "center",
        fontSize: 15,
        color: "white",
        margin: 2,
    },
});
