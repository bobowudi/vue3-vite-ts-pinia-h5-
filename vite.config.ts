import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from "vite-plugin-mock";
import PPTV from  'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      /**
       * Auto import functions from Vue, e.g. ref, reactive, toRef...
       * 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
       */
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [
        ElementPlusResolver()
      ],
      dts: './typings/auto-import.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
      dts: './typings/components.d.ts'
    }),
    createSvgIconsPlugin({
      //  指定需要缓存的图标文件夹
      iconDirs: [resolve(join(__dirname, 'src/svgs'))],
      // 指定symbolId格式
      symbolId: 'svg-[name]',
      customDomId: '__svg__icons__dom__',
    }),
    viteMockServe({
      mockPath: "./src/mock/index", // 解析刚刚user.ts的位置
      localEnabled: true // 是否开启开发环境
    }),
  ],
  css:{
    postcss:{
      plugins:[
        autoprefixer(),
        PPTV({
          viewportWidth: 375,
          viewportUnit: 'vw',
          exclude: []
        })
      ]
    }
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: '192.168.3.164:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
