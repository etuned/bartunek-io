import type { PortableTextComponents } from '@portabletext/react';
import { Link } from '@tanstack/react-router';
import { AnchorExternalLink } from '#/components/ui/anchor-link';
import ReactPlayer from 'react-player'

const isDev = import.meta.env.DEV

export const components = {
	marks: {
		left: ({ children }) => <span className="text-left block">{children}</span>,
		center: ({ children }) => (
			<span className="text-center block">{children}</span>
		),
		right: ({ children }) => <span className="text-right block">{children}</span>,
		link: ({ value, children }) =>
			(String(value?.href).startsWith('http')) ? (
				<AnchorExternalLink href={value?.href}>{children}</AnchorExternalLink>
			) : (
				<Link to={value?.href}>{children}</Link>
			),
	}!,
    hardBreak: () => <><br /><br /></>,
	types: {
		youTube: ({value}) => {
			const {url} = value
			return <ReactPlayer
                    src={url}
                    style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                    config={{
                        youtube: {
                            origin: isDev ? "http://localhost:3000" : "https://www.bartunek.io",
                            referrerpolicy: "strict-origin-when-cross-origin"
                        }
                    }}

                />
		}
	}
} satisfies PortableTextComponents;
