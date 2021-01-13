const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.get('/converter', (req, res) => {
    let { convertFrom, convertTo, value } = req.query;

    if (
        convertFrom === undefined
        || convertFrom === ''
        || convertTo === undefined
        || convertFrom === ''
        || value === undefined
        || value === ''
    ) {
        return res.status(400).json({ status: false, value: 'Los datos no pueden ser leídos' });
    }

    switch (convertFrom) {
        case 'binary': {
            value = '0b' + value;
            break;
        }
        case 'octal': {
            value = '0o' + value;
            break;
        }
        case 'decimal': {
            value = value;
            break;
        }
        case 'hexadecimal': {
            value = '0x' + value;
            break;
        }
        default: {
            res.status(400).json({
                status: false,
                value: 'ConvertFrom no es válido, por favor realice la consulta nuevamente'
            });
        }
    }

    console.log(value);

    if (isNaN(value)) {
        res.status(400).json({
            status: false,
            value: 'Value no es válido, por favor verifique'
        });
    }


    switch (convertTo) {
        case 'binary': {
            res.status(200).json({
                status: true,
                value: Number(value).toString(2)
            });
            break;
        }
        case 'octal': {
            res.status(200).json({
                status: true,
                value: Number(value).toString(8)
            });
            break;
        }
        case 'decimal': {
            res.status(200).json({
                status: true,
                value: Number(value).toString(10)
            });
            break;
        }
        case 'hexadecimal': {
            res.status(200).json({
                status: true,
                value: Number(value).toString(16)
            });
            break;
        }
        default: {
            res.status(400).json({
                status: false,
                value: 'ConvertTo no es válido, por favor realice la consulta nuevamente'
            });
        }
    }

});

app.listen(port, () => {
    console.log(`Servidor está corriendo en http://localhost:${port}`);
});
