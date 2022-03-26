import axios from 'axios';

export const projectCreate = (project) => {
    axios.post('http://localhost:8090/forecast', project)
}
export const projectGet = async () => {
     return await axios.get(`http://192.168.0.102:8090/getproject/${77}`).then((res) => {
         console.log(res);
         return res.data;
})
}

export const projectGetSingle = async (projectid) => {
    return await axios.get(`http://192.168.0.102:8090/getproject/${77}/${projectid}`).then((res) => {
        console.log(res);
        return res.data;
})
}


export const getCustomerWithMail = async (email) => {
    return await axios.get(`http://192.168.0.102:8090/getcustomer/${email}`).then((res) => {
        console.log(res);
        return res.data;
})
}