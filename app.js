const Koa = require('koa')
const SocketIo = require('socket.io')
const koaStatic = require('koa-static')
const path = require('path')

const CreatePoint = require('./createPoint')

const app = new Koa()
const server = require('http').createServer(app.callback())

app.use(koaStatic(path.join(__dirname, './public')))

const socket = SocketIo(server)

socket.on('connection', (client) => {
  // console.log(client)
  client.on('setPoint', (point) => {
    console.log(point)
    // 1. 创建一个创造坐标的实例
    let CreateCustomPoint = new CreatePoint(point)
    // 每隔3秒向客户端推送一次坐标
    setInterval(() => {
      client.emit('newPoint', CreateCustomPoint.randomAction())
    }, 1000)
  })
})

server.listen(7900)
