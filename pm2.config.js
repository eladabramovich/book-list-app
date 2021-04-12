module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/server.js',
      node_args: '-r dotenv/config',
    },
  ],
};
