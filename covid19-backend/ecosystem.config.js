module.exports = {
  apps : [{
    name: 'COVID19 API',
    script: 'yarn',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'develop',
    instances: 1,
    autorestart: true,
    watch: true,
  }],
};
