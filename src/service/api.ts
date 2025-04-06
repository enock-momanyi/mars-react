import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY
    }
})



export const nasaAPI = {
    getManifest: (rover: string) => 
        api.get(`/mars-photos/api/v1/manifests/${rover}`),
    getPhotosSol: (rover: string, sol: number, camera: string, page: number) =>
        api.get(`/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}`),
    getPhotosEarth: (rover: string, earth_date: number, camera: string, page: number) =>
        api.get(`/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&camera=${camera}&page=${page}`)
}