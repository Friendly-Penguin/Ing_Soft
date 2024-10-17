import axios from "axios"

export default class ApiService{

    //static BASE_URL = "http://192.168.178.20:8080"

    static getHeader(){
        const token = localStorage.getItem("token");
        return{
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }



/*AUTH*/

    /* This is used to register a new user*/
    static async registerUser(registration){
        const response = await axios.post('/auth/register', registration)
        return response.data
    }

    /* This is used to login a registered user */
    static async loginUser(loginDetails){
        const response = await axios.post(`/auth/login`, loginDetails)
        return response.data
    }

/* USER */

    /* This is used to retrive a user profile*/
    static async getUser(userID){
        const response = await axios.get(`/user/get-by-id/${userID}`, {headers: this.getHeader()})
        return response.data
    }

    /* This is used to delete a user profile */
    static async deleteUser(userID){
        const response = await axios.get(`/user/delete/${userID}`,{headers: this.getHeader()})
        return response.data
    }

    /* This is used by a user to add a new question */
    static async addQuestion(formData){
        const result = await axios.post(`/FAQ/add`, formData);
        return result.data
    }

    /* This is used to retrive all the question made by a specific user */
    static async getAllUserQuestion(userID){
        const result = await axios.get(`/user/user-question/${userID}`, {headers: this.getHeader()})
        return result.data
    }

/* FAQ section */

    /* This is used to retrive all the answered question */
    static async getAllAnsweredQuestion(){
        const result = await axios.get(`/FAQ/all`)
        return result.data
    }

/* ADMIN */

    /* This is used to retrive all the answered without an answer */
    static async getAllNotAnsweredQuestion(){
        const result = await axios.get(`/FAQ/all-not-answered`)
        return result.data
    }

/**AUTHENTICATION CHECKER */

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }



}