import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack/dev';

type ServerOptions = ConstructorParameters<typeof WebpackDevServer>[0];

async function runServer() {
    const compiler = Webpack(webpackConfig);
    const host = 'localhost';
    const port = 3000;
    const devServerOptions: ServerOptions = {
        open: false,
        host,
        port,
        client: {
            // progress: true,
        },
    };
    const server = new WebpackDevServer(devServerOptions, compiler);
    await server.start();
}

runServer();
