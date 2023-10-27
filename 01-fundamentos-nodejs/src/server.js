import http from 'node:http'

const users = []

const server = http.createServer(async (req, response) => {
    const { method, url } = req;

    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }


    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }
    
    console.log(method, url)

    if (method == 'GET' && url == '/users') {
        return response
            .setHeader('Content-type', 'application/json')
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
