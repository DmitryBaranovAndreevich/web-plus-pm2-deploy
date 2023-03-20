require("dotenv").config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
} = process.env;

module.exports = {
  apps: [
    {
      name: "pm2-backend",
      script: "./backend/dist/app.js",
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
      "pre-deploy-local": `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      "post-deploy":
        "rm -rf frontend && cd backend && npm i &&  ./node_modules/.bin/pm2 start src/app.ts",
    },
  },
};
