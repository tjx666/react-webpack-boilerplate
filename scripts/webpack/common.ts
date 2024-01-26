import { resolve } from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration } from 'webpack';
import webpack from 'webpack';

import { isDev } from './utils';

const inCwd = (relativePath: string) => resolve(import.meta.dirname, '../../', relativePath);

const config: Configuration = {
    target: ['web', 'es5'],
    stats: 'minimal',
    entry: inCwd('src/index.tsx'),
    output: {
        clean: true,
        path: inCwd('dist'),
        filename: '[name]-[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: inCwd('public/index.html'),
        }),
        new webpack.ProgressPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(?:m|c)?(?:js|ts)x?$/i,
                exclude: isDev ? /node_modules/ : /node_modules[\\/](?!(antd)[\\/]).*/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            target: isDev ? 'esnext' : 'es5',
                        },
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev,
                            postcssOptions: {
                                plugins: [['tailwindcss']],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(bmp|png|apng|jpg|jpeg|gif|svg|webp|avif|heif|jxl)$/i,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[contenthash][ext]',
                },
            },
            {
                test: /\.(mp3|wav|flac|aac|ogg|aiff)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'audios/[contenthash][ext]',
                },
            },
            {
                test: /\.(mp4|mov|avi|flv|mkv|wmv)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'videos/[contenthash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[contenthash][ext]',
                },
            },
        ],
    },
};

export default config;
