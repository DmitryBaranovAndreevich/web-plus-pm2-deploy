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
      name: "pm2-front",
      script: "./frontend/build/index.html",
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "https://github.com/DmitryBaranovAndreevich/web-plus-pm2-deploy.git",
      path: DEPLOY_PATH,
      "post-deploy": "rm -rf backend && cd frontend && npm i && npm run build",
    },
  },
};
