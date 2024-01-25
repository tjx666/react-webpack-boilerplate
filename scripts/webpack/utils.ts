export const isDev = process.argv.includes('--dev');
export const isProd = !isDev;
