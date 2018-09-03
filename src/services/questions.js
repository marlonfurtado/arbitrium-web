import Http from './http'

export const update = data => Http.put('/questions/' + data.event_id,  data)

export const create = data => Http.post('/questions/', data)