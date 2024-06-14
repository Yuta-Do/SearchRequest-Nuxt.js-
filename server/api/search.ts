import { defineEventHandler, getQuery, } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const searchQuery = query.q as string
    const apiKey = process.env.GOOGLE_API_KEY as string
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID as string

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchQuery}`

    const response = await axios.get(url)
    return response.data
})
