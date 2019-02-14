const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')

const server = express()

const renderer = VueServerRenderer.createRenderer({
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.template.html'), 'utf-8')
})

server.use(express.static('public'))

server.get('/', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的url是： {{url}}</div>`
  })

  console.log(req.url)

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(3000, () => {
  console.log(`served at 3000`)
})