// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyComponent from '../components/MyLayout.vue';

import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // slots的方式，在默认主题上更改。
      "home-features-after": () => h(MyComponent)
    })
  },
} satisfies Theme
