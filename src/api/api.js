import axios from "axios";

export const authAPI = {
    getUsers() {
        return axios.get("/auth.json").then(response => {
            return response.data;
        })
    }
}

const YOUTUBE_API_KEY = 'AIzaSyCEUe4U79ndZVR7p-GkGhQFIIP5WsTpWII';
const youtubeInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        key: YOUTUBE_API_KEY
    }
})

export const youtubeAPI = {
    search(queryText, queryParams) {
        return youtubeInstance.get(`search`, {
            params: {
                type: 'video',
                part: 'snippet',
                q: queryText,
                ...queryParams
            }
        }).then(response => {
            return response.data;
        })
    },
    getVideo(id) {
        return youtubeInstance.get(`videos`, {
            params: {
                id,
                part: 'statistics'
            }
        }).then(response => {
            return response.data;
        })
    }
}