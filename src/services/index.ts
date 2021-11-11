import Axios from 'axios';
// import {API_URL, API_TOKEN} from "@env"

export default Axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`
})