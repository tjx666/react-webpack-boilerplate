import { RsdoctorWebpackPlugin } from '@rsdoctor/webpack-plugin';
import type { Configuration } from 'webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
// import { WebpackStatsViewerPlugin } from 'webpack-stats-viewer-plugin';

import prodConfig from './prod';

const analyzeConfig: Configuration = {
    plugins: [
        // new BundleAnalyzerPlugin(),
        // new WebpackStatsViewerPlugin(),
        new RsdoctorWebpackPlugin({}),
    ],
};

console.log('analyze mode!');

export default merge(prodConfig, analyzeConfig);
