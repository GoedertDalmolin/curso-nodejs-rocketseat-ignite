import http from 'node:http'

const server = http.createServer((req, response) => {
    const { method, url } = req;

    console.log(method, url)

    if (method == 'GET' && url == '/users') {
        return response.end('Listagem de usuarios')
    }

    if (method == 'POST' && url =='/users') {
        return response.end('Criacão de usuarios')
    }
    
    return response.end('Hello World')
})

server.listen(3333)
