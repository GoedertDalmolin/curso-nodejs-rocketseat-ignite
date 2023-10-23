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

        return response.end('Criacão de usuarios')
    }

    return response.end('Hello World')
})

server.listen(3333)

// Nessa aula foi possível compreender como salvar/armazenar localmente na memória da aplicação informações utilizadas dentro do server (stateful).
// Compreendido a diferença entre aplicação stateful e stateless.
// Visto sobre os três formatos unicos de retorno referênte a servidores node.
// Visto sobre como definir Headers (cabeçalhos) da response request. 