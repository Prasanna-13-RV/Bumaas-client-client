import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

const Reports = ({ navigation, route }) => {
	console.log(route.params.forecastid);
	return (
		<View style={styles.container}>
			{/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.btn}>Sign Out</Text>
			</TouchableOpacity> */}

			<TouchableOpacity
				style={styles.options}
				onPress={() =>
					navigation.push('Reports_Forecast', {
						forecastid: route.params.forecastid
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
					PROJECT VISE FORECAST
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.options}
				onPress={() =>
					navigation.push('Reports_Orders', {
						forecastid: route.params.forecastid
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
					PROJECT VISE ORDERS
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Reports;

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
		elevation: 5,
		borderRadius: 10,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		marginVertical: 10
	}
});
