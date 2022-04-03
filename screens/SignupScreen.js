import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { getCustomerWithMail } from '../axios/axios';
import { useNavigation } from '@react-navigation/native';
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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleLogin = async () => {
		await getCustomerWithMail(email).then((res) => {
			if (res[0] === undefined) {
				setErrorMessage('Email not found');
			} else {
				console.log('insider');
				// const password = email;
				auth
					.createUserWithEmailAndPassword(email.trim(), password)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						console.log(user);
            
						navigation.push('ProfileScreen', {
							customer_id: res[0].customer_id
						});
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(error);
						setErrorMessage(errorMessage);
						if (
							errorMessage ==
							'The email address is already in use by another account.'
						) {
							navigation.push('PasswordScreen');
						}
					});
			}
      
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign Up</Text>
			<TextInput
				placeholder='Enter your ID'
				style={styles.input}
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				placeholder='Enter your password'
				style={styles.input}
				onChangeText={(text) => setPassword(text)}
				value={password}
			/>
			<Text>{errorMessage}</Text>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.button}>Sign up</Text>
			</TouchableOpacity>
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
