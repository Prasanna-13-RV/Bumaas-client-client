import axios from 'axios';
const url = "192.168.137.181";
export const projectGet = async (customer_id) => {
	return await axios
		.get(`http://${url}:8090/getproject/${customer_id}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const forecastGet = async (customer_id) => {
	return await axios
		.get(`http:///${url}:8090/getforecast/${customer_id}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const projectGetSingle = async (forecastid) => {
	console.log(forecastid,'llll');
	return await axios
		.get(`http:///${url}:8090/getfore/${forecastid}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};

export const getCustomerWithMail = async (email) => {
	return await axios
		.get(`http:///${url}:8090/getcustomer/${email}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};
export const projectCreate = async (values,customer_id) => {
	const random = Math.random(10).toString().split(".")[1].slice(0, 8);
    const forecast_id = `Forecast_${random}`;
	return await axios.post(`http:///${url}:8090/forecast/${customer_id}`, {
		values,
		forecast_id
	})}

export const projectDelete = async (id) =>
	await axios.delete(`http:///${url}:8090/forecast/${id}`);
