import API from "../../configs/ApiConfig";
import { getCookie } from "../../core/Cookies";

class EDCApi {
  static async getAll() {
    let url = `${API.url}/edc`
    let bearer = 'Bearer ' + getCookie('token')

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        let json = await response.json()

        return json
    } catch (error) {
        console.log(error)        
    }
  }
}

export default EDCApi