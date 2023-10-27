import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i));

                this.push(buf)
            }

        }, 1000)


    }
}

// new OneToHundredStream().pipe(process.stdout)

class MultiplByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

// new OneToHundredStream().pipe(new MultiplByTenStream())

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        const buf = Buffer.from(String(transformed));

        callback(null, buf)
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplByTenStream())

// Visto sobre o conceito de Stream Writeble na pratica.
// O process.stdout é uma stream que processa dados e não que le dados.
// Visto sobre o conceito de Stream Transform na pratica.
// Visto sobre a teoria do conceito Stream duplex.