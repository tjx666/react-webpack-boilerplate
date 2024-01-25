import browserslist from 'browserslist';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as lightningcss from 'lightningcss';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import commonConfig from './common';

const prodConfig: Configuration = {
    mode: 'production',
    performance: {
        // 2MiB
        maxEntrypointSize: 1024 * 1024 * 2,
    },
    plugins: [new MiniCssExtractPlugin()],
    optimization: {
        runtimeChunk: {
            name: (entrypoint: { name: string }) => `runtime~${entrypoint.name}`,
        },
        splitChunks: {
            cacheGroups: {
                lib: {
                    test: /[/\\]node_modules[/\\](react|react-dom|antd)[/\\]/,
                    name: 'lib',
                    chunks: 'all',
                },
                vendor: {
                    test: /[/\\]node_modules[/\\]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.swcMinify,
                // `terserOptions` options will be passed to `swc` (`@swc/core`)
                // Link to options - https://swc.rs/docs/config-js-minify
                terserOptions: {},
            }),
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.lightningCssMinify,
                minimizerOptions: {
                    targets: lightningcss.browserslistToTargets(browserslist('>= 0.25%')),
                } as any,
            }),
        ],
    },
};

export default merge(commonConfig, prodConfig);
