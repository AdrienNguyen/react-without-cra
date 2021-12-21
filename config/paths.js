'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const publicUrlOrPath = ''

module.exports = {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.tsx'),
    publicUrlOrPath,
    appPackageJson: resolveApp('package.json'),
    dotenv: resolveApp('.env'),
    esLintFile: resolveApp('.eslintrc.js'),
    testsSetup: resolveApp('src/setupTests.ts'),
}
