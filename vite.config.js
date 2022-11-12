import { resolve } from 'path';
import { defineConfig } from "vite";
import commonjs from 'vite-plugin-commonjs';
import { generate } from 'peggy';
import { createFilter } from 'rollup-pluginutils';

export default defineConfig({
    plugins: [
        commonjs(),
        {
            name: 'pegjs',
            enforce: 'pre',        
            transform(code, id) {
                const include = ['*.pegjs', '**/*.pegjs'];
                const target = 'es6';
                const filter = createFilter(include);
                const exporter = target == 'es6' ? 'export default' : 'module.exports =';

                if(filter(id)) {
                    return {
                        code: `
                            export default \`${code}\`;

                            export const parser = ${
                                generate(code, {output: 'source'})
                            };
                            
                            export const parse = parser.parse;
                            export const SyntaxError = parser.SyntaxError;
                        `,
                        map: {
                            mappings: '' 
                        }
                    }
                }
            }
        }
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "index.ts"),
            name: "tailwind-colorize",
            fileName: (format) => `tailwind-colorize.${format}.js`,
        },
        commonjsOptions: {
            esmExternals: true 
        },
        minify: false
    },
    
});