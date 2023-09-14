"use strict";
function serverFactory(app) {
    const port = process.env.PORT || 3000;
    const url = `http://localhost:${port}`;

    app.listen(port, () => {
        console.log(`🚀 Server ready at ${url} : ''}`);
    });
}
exports.serverFactory = serverFactory;
