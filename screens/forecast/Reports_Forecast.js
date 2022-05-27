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
			<ImageBackground source={image} resizeMode="cover" style={styles.image}>
			<View style={styles.container}>
				<Text style={styles.text}>{route.params.type == 'performance'?'SERVICE PERFORMANCE' : 'PROJECT VISE FORECAST'}
</Text>
			</View>
			<ScrollView>
				{project && console.log(project)}
				{project && <ReportsForecast forecast={project} type={route.params.type} />}
			</ScrollView>
			</ImageBackground>
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
		// marginLeft: '25%'
	},
	image: {
		flex: 1,
		justifyContent: "center",
	  },
});
