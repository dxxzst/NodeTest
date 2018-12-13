function route(handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);

    let reaArr = pathname.split('/');

    handle(reaArr, response, request);
}

exports.route = route;
