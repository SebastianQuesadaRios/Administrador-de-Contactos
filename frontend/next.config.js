/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de rewrites para manejar CORS
  async rewrites() {
    return [
      {
        // Redirige todas las peticiones /api/* al backend
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 