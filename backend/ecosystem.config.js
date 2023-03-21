require("dotenv").config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  APP_PATH,
  DEPLOY_REF = "origin/main",
} = process.env;

module.exports = {
  apps: [
    {
      name: "pm2-backend",
      script: APP_PATH,
    },
  ],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "https://github.com/DmitryBaranovAndreevich/web-plus-pm2-deploy.git",
      path: DEPLOY_PATH,
      "pre-deploy-local": `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      "post-deploy":
        "rm -rf frontend && cd backend && npm i &&  npm run build && pm2 restart all",
    },
  },
};
