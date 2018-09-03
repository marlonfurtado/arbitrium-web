import Http from './http'

export const create = data => Http.post('/interviews', data)
