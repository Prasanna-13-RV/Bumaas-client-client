import { StyleSheet, Text, View, TouchableOpacity,ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
const image = { uri: "https://wallpaperaccess.com/full/3966936.jpg" };
const Reports = ({ navigation, route,forecastid }) => {
	console.log(forecastid,'fian');
	return (
		<ImageBackground source={image} resizeMode="cover" style={styles.image}>
			{/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.btn}>Sign Out</Text>
			</TouchableOpacity> */}

			<TouchableOpacity
				style={styles.options}
				onPress={() =>
					navigation.push('forecastList', {
						forecastid: forecastid.forecastid,
						type: 'Forecast',
					})
				}
			>
				<Text
					style={{
						color: '#ffaa00',
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
					navigation.push('OrderList', {
						forecastid: forecastid.forecastid
					})
				}
			>
				<Text
					style={{
						color: '#ffaa00',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					PROJECT VISE ORDERS
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.options}
				onPress={() =>
					navigation.push('forecastList', {
						forecastid: forecastid.forecastid,
						type: 'performance'
					})
				}
			>
				<Text
					style={{
						color: '#ffaa00',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					SERVICE PERFORMANCE
				</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
};
const mapStateToProps = (state) => {
	const {forecastid} = state
	console.log('====================================');
	console.log(forecastid,'sss');
	console.log('====================================');
	return{forecastid}
  };
export default connect(mapStateToProps)(Reports);

const styles = StyleSheet.create({
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: 'center',
		
	  },
	container: {
		flex: 1,
		backgroundColor: '#fff',
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
		height: 80,
		backgroundColor: 'rgba(0,0,0,.2)',
		borderWidth: 1.5,
		borderColor: '#ffaa00',
		// shadowColor: '#609BEB',
		// elevation: 5,
		borderRadius: 50,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		marginVertical: 10
	}
});
