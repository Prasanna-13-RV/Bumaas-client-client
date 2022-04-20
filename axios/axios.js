import axios from 'axios';

const baseUrl = 'http://192.168.0.104:8090';

export const projectGet = async (customer_id) => {
	return await axios.get(`${baseUrl}/getproject/${customer_id}`).then((res) => {
		console.log(res);
		return res.data;
	});
};
export const forecastGet = async (customer_id) => {
	return await axios
		.get(`${baseUrl}/getforecast/${customer_id}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const projectGetSingle = async (forecastid) => {
	console.log(forecastid, 'llll');
	return await axios.get(`${baseUrl}/getfore/${forecastid}`).then((res) => {
		console.log(res);
		return res.data;
	});
};

export const getCustomerWithMail = async (email) => {
	return await axios.get(`${baseUrl}/getcustomer/${email}`).then((res) => {
		console.log(res);
		return res.data;
	});
};
export const projectCreate = async (values, customer_id) =>
	await axios.post(`${baseUrl}/forecast/${customer_id}`, values);

export const projectDelete = async (id) =>
	await axios.delete(`${baseUrl}/forecast/${id}`);
