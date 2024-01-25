import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import commonConfig from './common';

const devConfig: Configuration = {
    mode: 'development',
    devtool: 'eval-source-map',
    experiments: {
        lazyCompilation: true,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
};

export default merge(commonConfig, devConfig);
