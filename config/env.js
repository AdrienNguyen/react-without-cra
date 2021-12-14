'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('./paths')
const PACKAGE = require(paths.appPackageJson)

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')]

const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
    throw new Error(
        'The NODE_ENV enviroment variable is required but was not specified.',
    )
}

const dotenvFiles = [`${paths.dotenv}.${NODE_ENV}`].filter(Boolean)

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((file) => {
    if (fs.existsSync(file)) {
        require('dotenv-expand')(
            require('dotenv').config({
                path: file,
            }),
        )
    }
})

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter((folder) => folder && !path.isAbsolute(folder))
    .map((folder) => path.resolve(appDirectory, folder))
    .join(path.delimiter)

const REACT_APP = /^/i

const getClientEnviroment = (publicUrl) => {
    const raw = Object.keys(process.env)
        .filter((key) => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key]
                return env
            },
            {
                NODE_ENV: process.env.NODE_ENV || 'development',
                PUBLIC_URL: publicUrl,
                VERSION: PACKAGE.version,
            },
        )
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key])
            return env
        }, {}),
    }

    return { raw, stringified }
}

module.exports = getClientEnviroment
