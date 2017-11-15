module.exports = {
  name : 'EP2P',
  version : '0.0.1',
  env : process.env.NODE_ENV || 'development',
  port : process.env.PORT || 8080,
  base_url : process.env.BASE_URL || 'http://localhost:8080',
  blockchain_url : process.env.EP2P_URL || 'http://localhost:8545',
}
