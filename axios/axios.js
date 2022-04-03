import axios from 'axios';

export const projectGet = async (customer_id) => {
	return await axios
		.get(`http://192.168.0.103:8090/getproject/${customer_id}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const forecastGet = async (customer_id) => {
	return await axios
		.get(`http://192.168.0.103:8090/getforecast/${customer_id}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const projectGetSingle = async (forecastid) => {
	console.log(forecastid,'llll');
	return await axios
		.get(`http://192.168.0.103:8090/getfore/${forecastid}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};

export const getCustomerWithMail = async (email) => {
	return await axios
		.get(`http://192.168.0.103:8090/getcustomer/${email}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const projectCreate = async (values,customer_id) =>
	await axios.post(`http://192.168.0.103:8090/forecast/${customer_id}`, values);

export const projectDelete = async (id) =>
	await axios.delete(`http://192.168.0.103:8090/forecast/${id}`);
