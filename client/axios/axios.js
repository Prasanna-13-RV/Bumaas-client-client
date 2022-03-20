import axios from 'axios';

export const projectCreate = (project) => {
    axios.post('http://localhost:8090/forecast', project)
}