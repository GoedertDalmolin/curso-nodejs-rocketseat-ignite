import http from 'node:http'
import { json } from './middlewares/json.js';

const users = []

const server = http.createServer(async (req, response) => {
    const { method, url } = req;

   await json(req, response);
    
    console.log(method, url)

    if (method == 'GET' && url == '/users') {
        return response
            
            .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users') {
        const { nome, email } = req.body

        users.push({
            id: 1,
            name: nome,
            email: email,
        })

        // Status 201 simboliza que a request foi um sucesso, porém que especificamente foi possivel criar um recurso.
        return response
            .writeHead(201)
            .end()
    }

    return response
        .writeHead(404).end()
})

server.listen(3333)


Visto sobre os middlewares dentro do node 
Centralizado algumas funções dentro dos middleware
