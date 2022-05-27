import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	StatusBar,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ReportsForecast from '../../components/forecast/ReportsForecast.component';
import { projectGetSingle } from '../../axios/axios';
import { db } from '../../firebase/firebase';
const Reports_Forecast = ({ route }) => {
	console.log(route.params.forecastid,'ll');
	const [project, setProject] = useState([]);
	const { forecastid } = route.params;
	const forecastRef = db.collection('Forecast').where('Forecastid', '==', forecastid);
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
			<StatusBar
				barStyle='dark-content'
				hidden={false}
				backgroundColor='#00BCD4'
				translucent={true}
			/>
			<View style={styles.container}>
				<Text style={styles.text}>Reports & Forecast</Text>
			</View>
			<ScrollView>
				{project && console.log(project)}
				{project && <ReportsForecast forecast={project} />}
			</ScrollView>
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
		justifyContent: 'center',
		width: '100%',
		marginLeft: '25%'
	}
});
