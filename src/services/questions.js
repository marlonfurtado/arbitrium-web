import Http from './http'

export const create = data => Http.put('/questions/' + data.event_id,  data)