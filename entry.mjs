import express from 'ultimate-express';
import fs from 'node:fs';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
const base = '/';
app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'nkko.link');
    next();
});
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);
// app.use((req, res, next) => {
//     res.statusCode = 404;
//     res.send(fs.readFileSync('./dist/client/404.html','utf-8'))
// });
app.listen(4322);

console.log(`Listening on port 4321`);
