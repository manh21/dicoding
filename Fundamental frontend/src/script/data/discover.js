import axios from 'axios';
import tmdb from './config'
import swal from 'sweetalert';

const apikey = "7604034d19b0246c0dd655dcef596eb8";
const baseUrl = "https://api.themoviedb.org/3";

class API {
    static getTrending(page = 1, media_type = "movie", time_window = "week") {
        return axios.get(`${baseUrl}/trending/${media_type}/${time_window}`, {
            params: {
                api_key: apikey, 
                page: page,
            }
        }).then(function (response) {
            // console.log(response);
            if(response.data.results){
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch( (error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
                swal("Error" , `${error.response.data.status_message}`, "error")
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                swal("Error" , "The request was made but no response was received", "error")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error.message);
                swal("Error", `${error.message} \n\n Something happened in setting up the request that triggered an Error`, "error");
            }
            console.log(error);
            return Promise.reject();
        });
    };

    static getMovieDiscover(page = 1, include_adult = false, sort_by = "popularity.desc"){
        return axios.get(`${baseUrl}/discover/movie`, {
            params: {
                api_key: apikey, 
                page: page,
                include_adult: include_adult,
                sort_by: sort_by,
            }
        }).then(function(response){
            // console.log(response);
            if(response.data.results){
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch( (error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
                swal("Error" , `${error.response.data.status_message}`, "error")
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                swal("Error" , "The request was made but no response was received", "error")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error.message);
                swal("Error", `${error.message} \n\n Something happened in setting up the request that triggered an Error`, "error");
            }
            console.log(error);
            return Promise.reject();
        });
    }

    static getTVDiscover(page = 1, sort_by = "popularity.desc"){
        return axios.get(`${baseUrl}/discover/tv`, {
            params: {
                api_key: apikey, 
                page: page,
                sort_by: sort_by,
            }
        }).then(function(response){
            // console.log(response);
            if(response.data.results){
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch( (error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
                swal("Error" , `${error.response.data.status_message}`, "error")
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                swal("Error" , "The request was made but no response was received", "error")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error.message);
                swal("Error", `${error.message} \n\n Something happened in setting up the request that triggered an Error`, "error");
            }
            console.log(error);
            return Promise.reject();
        });
    }
    
    static searchMovies(query, page = 1, include_adult = false) {
        return axios.get(`${baseUrl}/search/movie/`, {
            params: {
                api_key: apikey,
                query: query,
                page: page,
                include_adult: include_adult,
            }
        }).then(function(response){
            // console.log(response);
            if(response.data.results){
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch( (error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
                swal("Error" , `${error.response.data.status_message}`, "error")
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                swal("Error" , "The request was made but no response was received", "error")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error.message);
                swal("Error", `${error.message} \n\n Something happened in setting up the request that triggered an Error`, "error");
            }
            console.log(error);
            return Promise.reject();
        });
    }

    static getMovieDetail(movie_id, append_to_response) {
        return axios.get(`${baseUrl}/movie/${movie_id}/`, {
            params: {
                api_key: apikey,
                append_to_response: append_to_response,
            }
        }).then(function(response){
            // console.log(response);
            if(response.data.results){
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch( (error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
                swal("Error" , `${error.response.data.status_message}`, "error")
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                swal("Error" , "The request was made but no response was received", "error")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error.message);
                swal("Error", `${error.message} \n\n Something happened in setting up the request that triggered an Error`, "error");
            }
            console.log(error);
            return Promise.reject();
        });
    }
};


export default API;