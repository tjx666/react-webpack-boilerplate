import config from '@yutengjing/prettier-config';

/** @type {import('prettier').Config} */
export default {
    ...config,
    plugins: [...config.plugins, 'prettier-plugin-tailwindcss'],
};
