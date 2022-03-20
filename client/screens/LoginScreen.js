import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import React, { useState ,useEffect} from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from '../firebase/firebase';

// const auth = getAuth();

const LoginScreen = ({ navigation }) => {
	// useEffect(() => {
	// 	const unsubscribe  = auth.onAuthStateChanged((user) => {
	// 		if (user) {
	// 			navigation.push('ProfileScreen');
	// 		}
	// 	});
	// 	return unsubscribe;
	// } , []);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		auth.signInWithEmailAndPassword(email.trim(), password)
			.then((userCredential) => {
				const user = userCredential.user;
				if(user) {
					navigation.push('ProfileScreen')
				}
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>LoginScreen</Text>
			<TextInput
				placeholder='Enter your Email'
				style={styles.input}
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				placeholder='Enter your Password'
				style={styles.input}
				onChangeText={(text) => setPassword(text)}
				value={password}
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.button}>Login</Text>
			</TouchableOpacity>

			<Text
				onPress={() => navigation.push('RegisterScreen')}
				style={styles.text}
			>
				Create an Account - Register
			</Text>
			<Text
				onPress={() => navigation.push('ProfileScreen')}
				style={styles.text}
			>
				Profile
			</Text>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		borderWidth: 1,
		borderColor: 'black',
		width: '80%',
		marginBottom: 10,
		padding: 10
	},
	title: {
		fontSize: 30,
		marginBottom: 10
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		color: 'white'
	},
	text: {
		marginTop: 10,
		color: 'red'
	}
});
