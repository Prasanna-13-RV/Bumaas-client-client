import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
const image = { uri: "https://wallpaperaccess.com/full/3966936.jpg" };
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from 'react';
import ReportsOrder from '../../components/forecast/ReportsOrders.component';
import { projectGetSingle } from '../../axios/axios';
import { db } from '../../firebase/firebase';
const Reports_Orders = ({ route }) => {
	console.log(route.params.forecastid,'ll');
	const [project, setProject] = useState([]);
	const { forecastid } = route.params;
	const forecastRef = db.collection('orders').where('orderid', '==', forecastid);
	useEffect(async() => {
		const forecast = await forecastRef.get();
		console.log(forecast.docs.map((doc) => doc.data()),'llll');
		setProject(forecast.docs.map((doc) => doc.data()));
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
				<Text style={styles.text}>PROJECT VISE ORDERS 
</Text>
			</View>
			<ScrollView>
				{project && console.log(project)}
				{project && <ReportsOrder forecast={project} />}
			</ScrollView></LinearGradient>
		</>
	);
};

export default Reports_Orders;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		justifyContent: "center",
	  },
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 50,
		alignContent: 'center',
		justifyContent: 'center',
		width: '100%',
		color: 'white',
		// marginLeft: '25%'
		textAlign: 'center'
	}
});