import {defineConfig}  from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    base:'/weather-vanilla-js-app/',
    plugins:[vue()]
})