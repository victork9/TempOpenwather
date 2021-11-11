import Axios from "axios"
import * as NetInfo from '@react-native-community/netinfo';
import api from './index';
import { TOKEN_API } from "@env";

export async function dataServiceGet(req: any) {
    const internetInfo = await NetInfo.fetch()
    return new Promise((resolve, reject) => {
        if (internetInfo.type == "wifi" || internetInfo.type == "cellular" && internetInfo.details.cellularGeneration == "4g") {
            console.log(api.defaults.baseURL + req.uri + `&appid=${TOKEN_API}`)
            Axios.get(api.defaults.baseURL + req.uri + `&appid=${TOKEN_API}`)

                .then((response) => {

                    if (response.data?.errors) {
                        reject(response)
                    } else {
                        resolve(response.data)
                    }

                }).catch((error) => {


                    reject(error.response.data.message)

                })
        } else {
            console.log("hahahahaha")
            reject("Sem conexao com a internet")
        }
    })
}