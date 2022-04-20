import axios from 'axios';

// const baseUrl = 'http://192.168.0.104:8090';
const baseUrl = 'https://bummas-client-server.herokuapp.com';

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
	console.log(forecastid,'llll');
	return await axios
		.get(`${baseUrl}:8090/getfore/${forecastid}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};

export const getCustomerWithMail = async (email) => {
	return await axios
		.get(`${baseUrl}:8090/getcustomer/${email}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const projectCreate = async (values,customer_id) => {
	const random = Math.random(10).toString().split(".")[1].slice(0, 8);
    const forecast_id = `Forecast_${random}`;
	return await axios.post(`${baseUrl}:8090/forecast/${customer_id}`, {
		values,
		forecast_id
	})}

export const projectDelete = async (id) =>
	await axios.delete(`${baseUrl}:8090/forecast/${id}`);
