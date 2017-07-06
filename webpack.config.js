module.exports = {
    entry: {
        rxi: './src/rxi.ts'
    },
    output: {
        path: `${__dirname}/lib`,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['babel-loader', 'ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.ts', '.js']
    },
    externals: {
        'rxjs': 'rxjs'
    }
};
