import http from 'node:http'

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import internal from 'node:stream';
import { extractQueryParams } from './utils/extract-query-params.js';


const server = http.createServer(async (req, response) => {
    const { method, url } = req

    await json(req, response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)

        const {query, ...params} = routeParams.groups
        
        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, response)
    }

    return response.writeHead(404).end()
})

server.listen(3333)
