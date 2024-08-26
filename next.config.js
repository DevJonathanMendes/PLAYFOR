// Para carregar a variável de ambiente no lado do cliente
// precisa configurar aqui.
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
