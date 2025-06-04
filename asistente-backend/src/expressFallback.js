const http = require('http');

function createRouter(prefix = '') {
  const routes = [];
  const middlewares = [];
  const router = {
    prefix,
    use(path, handler) {
      if (typeof path === 'function') {
        middlewares.push(path);
      } else if (handler) {
        middlewares.push((req, res, next) => {
          if (req.url.startsWith(path)) {
            handler(req, res, next);
          } else {
            next();
          }
        });
      }
    },
    get(path, handler) { routes.push({ method: 'GET', path, handler }); },
    post(path, handler) { routes.push({ method: 'POST', path, handler }); },
    put(path, handler) { routes.push({ method: 'PUT', path, handler }); },
    delete(path, handler) { routes.push({ method: 'DELETE', path, handler }); },
    _routes: routes,
    _middlewares: middlewares,
  };
  return router;
}

function express() {
  const app = createRouter('');
  app.listen = function (port, cb) {
    const server = http.createServer((req, res) => {
      res.send = (data) => {
        if (typeof data === 'object') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } else {
          res.end(String(data));
        }
      };
      res.json = (obj) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      };
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try { req.body = body ? JSON.parse(body) : {}; } catch { req.body = {}; }
        const run = (middlewares, i, done) => {
          if (i < middlewares.length) {
            middlewares[i](req, res, () => run(middlewares, i + 1, done));
          } else {
            done();
          }
        };
        run(app._middlewares, 0, () => {
          const url = req.url.split('?')[0];
          const route = app._routes.find(r => r.method === req.method && r.path === url);
          if (route) return route.handler(req, res);
          res.statusCode = 404; res.end('Not Found');
        });
      });
    });
    server.listen(port, cb);
  };
  app.use = function(path, handler){
    if (typeof path === 'string' && handler && handler._routes) {
      handler._routes.forEach(r => {
        app._routes.push({ method: r.method, path: path + r.path, handler: r.handler });
      });
    } else if (typeof path === 'function') {
      app._middlewares.push(path);
    }
  };
  return app;
}

express.Router = createRouter;
express.json = () => (req, _res, next) => next();

module.exports = express;
