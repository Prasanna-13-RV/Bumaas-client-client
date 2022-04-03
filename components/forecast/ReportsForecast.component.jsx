import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect ,useState} from 'react';

const ReportsForecast = ({ project }) => {
	// console.log(project['project'][0],'kok');
	const [projects,setProjects] = useState(project)
	useEffect(()=> {

	},[project])
	return (
		// <TouchableOpacity>
		<>
			{project['forecast'] && (
				<>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Forecast No</Text>
						<Text style={styles.text_answer}>2345sdfgsdf</Text>
					</View>

					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Project Name </Text>
						<Text style={styles.text_answer}>{project['forecast'][0].project_name}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Customer part no</Text>
						<Text style={styles.text_answer}>{project['project'][0].customer_part_no}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>BEST Part no </Text>
						<Text style={styles.text_answer}>{project['project'][0].part_no}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Description </Text>
						<Text style={styles.text_answer}>{project['project'][0].description}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Product Group</Text>
						<Text style={styles.text_answer}>{project['project'][0].product_group}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Weight /Pc</Text>
						<Text style={styles.text_answer}>{project['project'][0].weight}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Standard Box Quantity</Text>
						<Text style={styles.text_answer}>
							{project['project'][0].standard_box_quantity}
						</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Norms per Project</Text>
						<Text style={styles.text_answer}>{project['project'][0].norms_per_project}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>
							QTY requirment for this month
						</Text>
						<Text style={styles.text_answer}>3452345sdsfasdf</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>
							QTY requirment for this month+1
						</Text>
						<Text style={styles.text_answer}>afgsdfgadf</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>
							QTY requirment for this month+2
						</Text>
						<Text style={styles.text_answer}>agfsdfgsghdfh</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Safety stock </Text>
						<Text style={styles.text_answer}>{project['project'][0].safety_stock}</Text>
					</View>
					<View style={styles.viewtable}>
						<Text style={styles.text_question}>Re Order Level</Text>
						<Text style={styles.text_answer}>{project['project'][0].re_order_level}</Text>
					</View>
				</>
			)}
		</>
		// </TouchableOpacity>
	);
};

export default ReportsForecast;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
		marginTop: 30,
		alignContent: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// height: 80,
		zIndex: 1
	},
	viewtable: {
		justifyContent: 'space-between',
		alignContent: 'center',
		margin: 10,
		// width: "90%",
		borderColor: '#6c757d',
		borderWidth: 1,
		borderRadius: 10,
		padding: 5
	},
	text_question: {
		fontSize: 15,
		fontWeight: 'bold',
		// width: "50%",
		padding: 5
	},
	text_answer: {
		fontSize: 15,
		// width: "50%",
		padding: 5
		// paddingBottom: 10,
	}
});
