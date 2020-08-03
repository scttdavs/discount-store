import typescript from 'rollup-plugin-typescript';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: './src/index.ts',
  output: {
    name: 'convenience-store',
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [
    typescript({ target: "es5" }),
    uglify()
  ]
}
