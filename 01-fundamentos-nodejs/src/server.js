import http from 'node:http'

const users = []

const server = http.createServer((req, response) => {
    const { method, url } = req;

    console.log(method, url)

    if (method == 'GET' && url == '/users') {
        return response
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
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
