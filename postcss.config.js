module.exports = {
    plugins: [
        require('tailwindcss'),
        require('./dist/index.js')(
            require('./tailwind.config.cjs')
        ),
        require('autoprefixer'),
    ]
};