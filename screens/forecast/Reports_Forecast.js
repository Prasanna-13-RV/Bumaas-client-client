import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
const image = { uri: "https://wallpaperaccess.com/full/3966936.jpg" };
import React, { useState, useEffect } from 'react';
import ReportsForecast from '../../components/forecast/ReportsForecast.component';
import { projectGetSingle } from '../../axios/axios';
import { db } from '../../firebase/firebase';
const Reports_Forecast = ({ route }) => {
	console.log(route.params.forecastid,'ll');
	const [project, setProject] = useState([]);
	const [order, setOrder] = useState();
	const { forecastid } = route.params;
	const forecastRef = db.collection('Forecast').where('Forecastid', '==', forecastid);
	console.log(`Order_${forecastid.split('_')[0]}`,'hlo');
	const orderRef = db.collection('orders').where('orderid', '==', `Order_${forecastid.split('_')[1]}`);
	useEffect(async() => {
		const forecast = await forecastRef.get();
		const order = await orderRef.get();
		console.log(order.docs.map((doc) => doc.data()),'llll');
		setProject(forecast.docs.map((doc) => doc.data()));
		setOrder(order.docs.map((doc) => doc.data()));
		// projectGetSingle(route.params.forecastid).then(
		// 	(res) => {
		// 		setProject(res);
		// 		console.log(res,'kk');
		// 	}
		// );
	}, []);
	return (
		<>
			
			<LinearGradient
        style={styles.image}
        start={[0, 1]}
        end={[1, 0]}
        colors={["#FF8489", "#D5ADC8"]}
      >
			<View style={styles.container}>
				<Text style={styles.text}>{route.params.type == 'performance'?'SERVICE PERFORMANCE' : 'PROJECT VISE FORECAST'}
</Text>
			</View>
			<ScrollView>
				{project && console.log(project)}
				{project && <ReportsForecast forecast={project} order={order} type={route.params.type} />}
			</ScrollView>
			</LinearGradient>
		</>
	);
};

export default Reports_Forecast;

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 50,
		alignContent: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		width: '100%',
		color: 'white',
		// marginLeft: '25%'
	},
	image: {
		flex: 1,
		justifyContent: "center",
	  },
});
