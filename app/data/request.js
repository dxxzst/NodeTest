

function get(reqArray, response, request) {
    let type = reqArray[1];
    let zoom = reqArray[2];
    let x = reqArray[3];
    let y = reqArray[4];

    response.statusCode = 200;
    response.setHeader('Content-Type', 'image/png');
    response.write('', "binary");
    response.end();
}

exports.get = get;
