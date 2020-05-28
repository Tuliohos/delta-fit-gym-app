import axios from 'axios'

const httpClient = axios.create({
    baseURL: "http://localhost:8080/api"
})

class ApiService{

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, object){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, object);
    }

    put(url, object){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, object);
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)
    }
}

export default ApiService