const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')

const server = express()

const renderer = VueServerRenderer.createRenderer({
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.template.html'), 'utf-8')
})

const context = {
  title: 'Vue SSR',
  meta: `
    <meta name="description" content="Vue in SSR">
  `
}

server.use(express.static(path.resolve(__dirname, '../public')))

server.get('/', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      path: '/enen'
    },
    method: {
      //不会被调用 其实被renderToString后是渲染好的html，并没有js代码
      goTo() {
        console.log(this.path)
        location.href = this.path;
      }
    },
    beforeCreate() {
      console.log('this is beforeCreate') //后台会打印
    },
    created() {
      console.log('this is create') //后台会打印
    },
    beforeMount() {
      console.log('this is mount') //不会打印
    },
    mounted() {
      console.log('this is mounted') //不会打印
    },
    template: `
      <div>
        <div>访问的url是： {{url}}</div>
        <div>你想要访问的path是: {{path}}</div>
        <input type="text" v-model="path">
        <button @click="goTo">提交</button>
      </div>
    `
  })

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    console.log(html)
    res.end(html)
  })
})

server.listen(3000, () => {
  console.log(`served at 3000`)
})