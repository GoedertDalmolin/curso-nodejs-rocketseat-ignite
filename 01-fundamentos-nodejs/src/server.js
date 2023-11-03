import http from 'node:http'

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import internal from 'node:stream';


const server = http.createServer(async (req, response) => {
    const { method, url } = req

    await json(req, response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)
        
        req.params = { ...routeParams.groups }

        return route.handler(req, response)
    }

    return response.writeHead(404).end()
})

server.listen(3333)
