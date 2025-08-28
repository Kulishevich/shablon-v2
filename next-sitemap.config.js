/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ['*'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
};
