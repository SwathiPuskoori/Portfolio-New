import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'
import vercel from '@astrojs/vercel'

export default defineConfig({
	site: 'https://portfolio-new-itp2-git-main-swathipuskooris-projects.vercel.app',
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon({
			iconDir: 'src/icons',
			collections: {
				logos: () => import('@iconify-json/logos/icons.json'),
				'simple-icons': () => import('@iconify-json/simple-icons/icons.json'),
				mdi: () => import('@iconify-json/mdi/icons.json'),
				carbon: () => import('@iconify-json/carbon/icons.json')
			},
			cache: true
		})
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow', 'noopener', 'noreferrer']
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	prefetch: true,
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true },
		isr: {
			expiration: false
		},
		runtime: 'nodejs20.x' 
	})
})