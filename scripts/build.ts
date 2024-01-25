import webpack from 'webpack';

async function build() {
    const { default: config } = await import(
        `./webpack/${process.argv.includes('--analyze') ? 'analyze' : 'prod'}`
    );

    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if ((err as any).details) {
                console.error((err as any).details);
            }
            return;
        }

        if (!stats) return;
        const info = stats.toJson();
        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
    });
}

build();
