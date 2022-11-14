module.exports = {
    plugins: [
        require('tailwindcss'),
        require('./index')(),
        require('autoprefixer'),
    ]
};