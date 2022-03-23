import axios from 'axios';

export const projectCreate = async (project) =>
	await axios.post('http://192.168.0.103:8090/forecast', project);

export const projectDelete = async (id) =>
	await axios.delete(`http://192.168.0.103:8090/forecast/${id}`);
