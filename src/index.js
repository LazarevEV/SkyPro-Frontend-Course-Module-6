const http = require('http');
const url = require('url');
const users = require('./module/users.js')

const RESPONSE = {
    500: {
        statusMessage: 'Unknown parameters',
        headers: {
            'Content-Type': 'text/plain',
        },
    },
    400: {
        statusMessage: 'Empty name',
        headers: {
            'Content-Type': 'text/plain',
        },
    },
    404: {
        statusMessage: 'Not found',
        headers: {
            'Content-Type': 'text/plain',
        },
    },
    200: {
        statusMessage: 'OK',
        hello: {
            headers: {
                'Content-Type': 'text/plain',
            },
        },
        users: {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}

const PORT = process.env.PORT || 3000;

function createResponse(response, statusCode, {successType, textResponse, jsonResponse}={}) {
    response.statusCode = statusCode;
    response.statusMessage = RESPONSE[statusCode].statusMessage;
    for (const [header, headerValue] of Object.entries((statusCode === 200 ? RESPONSE[statusCode][successType].headers : RESPONSE[statusCode].headers))) {
        response.setHeader(header, headerValue);
    }

    response.write(`${response.statusCode}: ${response.statusMessage}\n`);
    const responseEnd = statusCode !== 200 ? `${statusCode}` : successType === 'users' ? jsonResponse : textResponse;
    // if (textResponse) response.write(textResponse + '\n');
    // if (jsonResponse) response.write(jsonResponse);

    response.end(responseEnd);
}

const server = http.createServer((request, response) => {
    const queryObject = url.parse(request.url, true).query;
    console.log(queryObject);

    if (Object.keys(queryObject).length > 1) {
        createResponse(response, 500);
        return;
    }

    if (Object.keys(queryObject).length === 0) {
        createResponse(response, 200, {successType: 'hello', textResponse: `Hello, World!`});
        return;
    }

    const param = Object.keys(queryObject)[0];
    const paramValue = queryObject[param];

    if (param === 'users') {
        createResponse(response, 200, {successType:'users', jsonResponse: JSON.stringify(users.getUserData())});
        return;
    }

    if ((param === 'hello') && (paramValue !== '')) {
        createResponse(response, 200, {successType: 'hello', textResponse: `Hello, ${paramValue}!`});
        return;
    }

    createResponse(response, 500);
    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
});

server.listen(PORT, () => {
    console.log(server.address());
});