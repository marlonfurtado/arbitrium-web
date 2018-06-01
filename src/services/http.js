import axios from 'axios'

if (process.env.API_SERVER)
  var apiServer = process.env.API_SERVER
else
  var apiServer = 'localhost'

const client = axios.create({
  baseURL: 'http://' + apiServer + ':3000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
})

export default client
