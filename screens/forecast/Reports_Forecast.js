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

const Reports_Forecast = ({ route }) => {
	const [project, setProject] = useState([]);
	useEffect(() => {
		projectGetSingle(route.params.forecastid).then(
			(res) => {
				setProject(res);
				console.log(res,'kk');
			}
		);
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
				<ReportsForecast project={project} />
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
