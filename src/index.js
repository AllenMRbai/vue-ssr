const express = require('express')
const fs = require('fs')
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')
const createApp = require("../views/app.js")

const server = express()

const renderer = VueServerRenderer.createRenderer({
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.template.html'), 'utf-8')
})

const templateContext = {
  title: 'Vue SSR',
  meta: `
    <meta name="description" content="Vue in SSR">
  `
}

server.use(express.static(path.resolve(__dirname, '../public')))

server.get('/', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context);

  renderer.renderToString(app, templateContext, (err, html) => {
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