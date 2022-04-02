import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

import { auth } from '../firebase/firebase';

const ProfileScreen = ({ navigation, route }) => {
	// useEffect(() => {
	// 	const unsubscribe  = auth.onAuthStateChanged((user) => {
	// 		if (!buser) {
	// 			navigation.push('LoginScreen');
	// 		}
	// 	});
	// 	return unsubscribe;
	// } , []);
	const handleSubmit = () => {
		console.log('logout');
		auth
			.signOut()
			.then(() => {
				navigation.push('LoginScreen');
			})
			.catch((error) => {
				console.log(error, 'error');
			});
	};

	return (
		<View style={styles.container}>
			{/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.btn}>Sign Out</Text>
			</TouchableOpacity> */}

			<TouchableOpacity
				style={styles.options}
				onPress={() => navigation.push('Forecast')}
			>
				<Text
					style={{
						color: '#609BEB',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					FORECAST
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.options}
				onPress={() => navigation.push('Actual_Forecast_Stock')}
			>
				<Text
					style={{
						color: '#609BEB',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					ACTUAL STOCK
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.options}
				onPress={() =>
					navigation.push('ShowProjects', {
						customer_id: route.params.customer_id
					})
				}
			>
				<Text
					style={{
						color: '#609BEB',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					REPORTS
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		color: 'white'
	},
	btn: {
		color: 'white'
	},
	options: {
		width: 320,
		height: 140,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#609BEB',
		shadowColor: '#609BEB',
		// shadowOffset: {width: 50, height: 40},
		// shadowOpacity: 1,
		// shadowRadius: 3,
		elevation: 5,
		borderRadius: 10,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		marginVertical: 10
	}
});
