const paths = require('./config/paths')
const express = require('express')
const path = require('path')
const PACKAGE = require(paths.appPackageJson)

const app = express()

require('dotenv').config({
    path: '.env.production',
})
const enviroment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

const DIST_DIR = path.join(__dirname, './build')
const HTML_FILE = path.join(DIST_DIR, 'index.html')
const mockResponse = {
    foo: 'foo',
    bar: 'bar',
    version: PACKAGE.version,
}

app.use(express.static(DIST_DIR))
app.get('/ping', (req, res) => {
    res.send(mockResponse)
})

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.listen(port, () => {
    console.log('enviroment: ', enviroment)
    console.log('> Ready on port: ', port)
})
