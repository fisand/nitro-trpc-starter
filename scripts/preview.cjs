const { spawn } = require('node:child_process')

const env = Object.assign({}, require('node:process').env, {
  DATABASE_URL: `file:${require('node:path').resolve(__dirname, '../.output/db/sqlite3.db')}`,
})

// 使用 spawn 执行脚本，并传入环境变量
const child = spawn('node', [require('node:path').resolve(__dirname, '../.output/server/index.mjs')], { env })

// 监听子进程的输出
child.stdout.on('data', (data) => {
  console.log(`${data}`)
})

child.stderr.on('data', (data) => {
  console.error(`${data}`)
})
