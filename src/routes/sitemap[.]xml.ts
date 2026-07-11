// src/routes/sitemap[.]xml.ts
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns/format';
import { fetchPostsList } from '../../utils/blog-posts-list';

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: async () => {
				const posts = await fetchPostsList();

				const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.bartunek.io</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.bartunek.io/about</loc>
  </url>
  <url>
    <loc>https://www.bartunek.io/projects</loc>
  </url>
  <url>
    <loc>https://www.bartunek.io/blog</loc>
  </url>
  ${posts
		?.map(
			(post) => `
  <url>
    <loc>https://www.bartunek.io/blog/${post.slug}</loc>
    <lastmod>${format(post.updatedAt, 'yyyy-MM-dd')}</lastmod>
  </url>`,
		)
		.join('')}
</urlset>`;

				return new Response(sitemap, {
					headers: {
						'Content-Type': 'application/xml',
					},
				});
			},
		},
	},
});
