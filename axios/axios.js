import axios from 'axios';

export const projectGet = async (customer_id) => {
	return await axios
		.get(`http://192.168.0.103:8090/getproject/${customer_id}`)
		.then((res) => {
			console.log(res);
			return res.data;
		});
};

export const projectGetSingle = async (projectid, customer_id) => {
	console.log(customer_id,projectid);
	return await axios
		.get(`http://192.168.0.103:8090/getproject/${customer_id}/${projectid}`)
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
export const projectCreate = async (project) =>
	await axios.post('http://192.168.0.103:8090/forecast', project);

export const projectDelete = async (id) =>
	await axios.delete(`http://192.168.0.103:8090/forecast/${id}`);
