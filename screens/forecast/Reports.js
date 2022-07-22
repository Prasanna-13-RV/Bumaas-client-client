import { StyleSheet, Text, View, TouchableOpacity,ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
const image = { uri: "https://wallpaperaccess.com/full/3966936.jpg" };
import { LinearGradient } from "expo-linear-gradient";
const Reports = ({ navigation, route,forecastid }) => {
	console.log(forecastid,'fian');
	return (
		<View style={styles.image}>
			{/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.btn}>Sign Out</Text>
			</TouchableOpacity> */}
		<LinearGradient
                        style={{
                        //   width: "100%",
                         
						borderRadius: 5,
						marginBottom: 20,
						elevation: 2,
                          // backgroundColor: "#DFF6FF",
                        }}
                        start={[0, 1]}
                        end={[1, 0]}
                        colors={["#FF8489", "#D5ADC8"]}
                      >
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
						color: '#fff',
						fontSize: 16,
						fontWeight: 'bold',
						
					}}
				>
					PROJECT VISE FORECAST
				</Text>
			</TouchableOpacity></LinearGradient>
			<LinearGradient
                        style={{
                        //   width: "100%",
						elevation: 2,
						borderRadius: 5,
						marginBottom: 20,
                          // backgroundColor: "#DFF6FF",
                        }}
                        start={[0, 1]}
                        end={[1, 0]}
                        colors={["#FF8489", "#D5ADC8"]}
                      ><TouchableOpacity
				style={styles.options}
				onPress={() =>
					navigation.push('OrderList', {
						forecastid: forecastid.forecastid
					})
				}
			>
				<Text
					style={{
						color: '#fff',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					PROJECT VISE ORDERS
				</Text>
			</TouchableOpacity></LinearGradient>
			<LinearGradient
                        style={{
                        //   width: "100%",
                         
						borderRadius: 5,
                          elevation: 2,
                          // backgroundColor: "#DFF6FF",
                        }}
                        start={[0, 1]}
                        end={[1, 0]}
                        colors={["#FF8489", "#D5ADC8"]}
                      ><TouchableOpacity
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
						color: '#fff',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					SERVICE PERFORMANCE
				</Text>
			</TouchableOpacity></LinearGradient>
		</View>
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
		backgroundColor: '#fff'
		
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
	
		
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		
	}
});
