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
        const result = await axios.post(`/question/add`, formData);
        return result.data
    }

    /* This is used to retrive all the question made by a specific user */
    static async getAllUserQuestion(userID){
        const result = await axios.get(`/question/question/${userID}`, {headers: this.getHeader()})
        return result.data
    }

/* QUESTION section */

    /* This is used to retrive all the answered question */
    static async getAllAnsweredQuestion(){
        const result = await axios.get(`/question/all`)
        return result.data
    }

/* ADMIN */

    /* This is used to retrive all the answered without an answer */
    static async getAllNotAnsweredQuestion(){
        const result = await axios.get(`/question/all-not-answered`)
        return result.data
    }

/* CATEGORY section */

    /* This is used to retrive all the category */
    static async getAllCategories(){
        const result = await axios.get(`/all`)
        return result.data
    }

    /* This is used to add a new category */
    static async addCategory(categoryType){
        const response = await axios.post(`/add`, categoryType, {headers: this.getHeader()})
    }

    /* This is used to remove a category */
    static async removeCategory(categoryID){
        const response = await axios.get(`/user/delete/${categoryID}`,{headers: this.getHeader()})
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