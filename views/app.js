// app.js
const Vue = require('vue')

module.exports = function createApp(context) {
  return new Vue({
    data: {
      url: context.url,
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
        <div>vue app is extract from index.js to /views/app.js</div>
        <div>访问的url是： {{url}}</div>
        <div>你想要访问的path是: {{path}}</div>
        <input type="text" v-model="path">
        <button @click="goTo">提交</button>
      </div>
    `
  })
}