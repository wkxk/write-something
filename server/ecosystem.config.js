/* eslint-disable no-console */
module.exports = {
  apps : [{
    name: 'wkxk',
    script: './index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '144.34.205.222',
      ref  : 'origin/master',
      repo : 'git@github.com:wkxk/write-something.git',
      path : '/home/www/server',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    development : {
      user : 'root',
      host : '144.34.205.222',
      ref  : 'origin/master',
      repo : 'git@github.com:wkxk/write-something.git',
      path : '/home/www/server',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
