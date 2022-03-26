import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	StatusBar,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { projectGetSingle } from '../../axios/axios';
import ReportsOrders from '../../components/forecast/ReportsOrders.component';

const Reports_Forecast = ({ route }) => {
	const [project, setProject] = useState([]);
	useEffect(() => {
		projectGetSingle(route.params.projectid, route.params.customer_id).then(
			(res) => {
				setProject(res[0]);
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
				<Text style={styles.text}>Reports vise orders </Text>
			</View>
			<ScrollView>
				<ReportsOrders project={project} />
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
