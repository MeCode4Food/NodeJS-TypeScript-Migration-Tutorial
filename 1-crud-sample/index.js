const Server = require('./server');
const routes = require('./routes');

const newServer = new Server();

newServer.init();
newServer.loadRoutes(routes);
newServer.start(3000);