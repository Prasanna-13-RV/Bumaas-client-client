import {
	StyleSheet,
	Text,
	View,
	Picker,
	ScrollView,
	TextInput,
	TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const Actual_Forecast_Stock = () => {
	const navigation = useNavigation();

	const actual_stock_schema = Yup.object().shape({
		customer_no: Yup.string().required(),
		best_part_no: Yup.string().required(),
		description: Yup.string().required(),
		actual_stock_quantity: Yup.number().required(),
		weekly_consumption: Yup.number().required()
	});

	const [customerno, setCustomerno] = useState('34567');
	const [bestpartno, setBestpartno] = useState('123456');

	const [description, setDescription] = useState('');
	const [actualstockquantity, setActualstockquantity] = useState('');
	const [weeklyconsumption, setWeeklyconsumption] = useState('');

	return (
		<>
			<Formik
				initialValues={{
					customer_no: '',
					best_part_no: '',
					description: '',
					actual_stock_quantity: '',
					weekly_consumption: ''
				}}
				validationSchema={actual_stock_schema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ handleSubmit, handleChange, handleBlur, values, errors }) => (
					<ScrollView>
						<View style={styles.container}>
							<View style={styles.sub_container}>
								<Text style={styles.text}>Customer No</Text>
								<Picker
									selectedValue={customerno}
									style={styles.picker}
									onValueChange={(itemValue, itemIndex) => {
										setCustomerno(itemValue);
									}}
								>
									<Picker.Item
										style={styles.picker}
										label='34567'
										value='34567'
									/>
									<Picker.Item
										style={styles.picker}
										label='23432'
										value='23432'
									/>
									<Picker.Item
										style={styles.picker}
										label='45645'
										value='45645'
									/>
								</Picker>
							</View>
							<View style={styles.sub_container}>
								<Text style={styles.text}>Best Part No</Text>
								<Picker
									selectedValue={bestpartno}
									style={styles.picker}
									onValueChange={(itemValue, itemIndex) => {
										setBestpartno(itemValue);
									}}
								>
									<Picker.Item
										style={styles.picker}
										label='123456'
										value='123456'
									/>
									<Picker.Item
										style={styles.picker}
										label='fdvsdfvdf'
										value='fdvsdfvdf'
									/>
									<Picker.Item
										style={styles.picker}
										label='afvadfvdsfv'
										value='afvadfvdsfv'
									/>
								</Picker>
							</View>
							<View style={styles.sub_container}>
								<Text style={styles.text}>Description</Text>
								<TextInput
									multiline={true}
									style={styles.textarea}
									placeholder='Description'
									onChangeText={(text) => handleChange('description')}
									onBlur={handleBlur('description')}
								/>
							</View>
							<View style={styles.sub_container}>
								<Text style={styles.text}>Actual Stock Number</Text>
								<TextInput
									style={styles.input}
									placeholder='Actual Stock Number'
									onChangeText={(text) => handleChange('actual_stock_quantity')}
									onBlur={handleBlur('actual_stock_quantity')}
								/>
							</View>
							<View style={styles.sub_container}>
								<Text style={styles.text}>Weekly consumption </Text>
								<TextInput
									style={styles.input}
									placeholder='Weekly consumption'
									onChangeText={handleChange('weekly_consumption')}
									onBlur={handleBlur('weekly_consumption')}
								/>
							</View>
							<View>
								<TouchableOpacity
									style={styles.button}
									onPress={() => {
										handleSubmit();
										navigation.navigate('ProfileScreen');
									}}
								>
									<Text style={{ color: 'white' }}>Submit</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				)}
			</Formik>
		</>
	);
};

export default Actual_Forecast_Stock;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50
	},
	sub_container: {
		// flex: 1,
		width: '90%',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10
	},
	picker: {
		width: '100%',
		height: 50,
		marginTop: 10,
		marginBottom: 10
	},
	textarea: {
		width: '100%',
		height: 100,
		margin: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		fontSize: 13,
		textAlignVertical: 'top'
	},
	input: {
		width: '100%',
		height: 50,
		margin: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		fontSize: 13
	},
	button: {
		width: '100%',
		// height: 50,
		margin: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		fontSize: 13,
		backgroundColor: 'blue',
		color: '#fff'
	}
});
