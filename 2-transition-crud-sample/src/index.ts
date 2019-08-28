import Server from './server';
import routes from './routes';

const newServer = new Server();

newServer.init();
newServer.loadRoutes(routes);
newServer.start(3000);