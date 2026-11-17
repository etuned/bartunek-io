import type { PortableTextComponents } from '@portabletext/react';
import { Link } from '@tanstack/react-router';
import { AnchorExternalLink } from '#/components/ui/anchor-link';
import ReactPlayer from 'react-player'
import { Image } from '#/components/image';
import { CodeBlock } from '#/components/ui/serializers/codeBlock';

const isDev = import.meta.env.DEV

export const components = {
	block: {
		h1: ({ children }) => <h1 className="text-3xl font-black">{children}</h1>,
		h2: ({ children }) => <h2 className="text-2xl font-extrabold">{children}</h2>,
		h3: ({ children }) => <h3 className="text-xl font-bold">{children}</h3>,
		h4: ({ children }) => <h4 className="text-lg font-semibold">{children}</h4>,
		h5: ({ children }) => <h5 className="text-base font-medium">{children}</h5>,
		h6: ({ children }) => <h6 className="text-sm font-medium">{children}</h6>,
	},
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
		},
		image: ({ value }) => {
			const { asset, alt, inline } = value;
			return (
				<div
					className={
						inline
							? 'm-4 float-left w-1/3 max-w-60 sm:w-auto sm:max-w-xs'
							: 'm-4 flex justify-center items-center'
					}
				>
					<Image
						className="max-w-full h-auto"
						loading="lazy"
						width={500}
						id={asset._ref}
						alt={alt}
					/>
				</div>
			);
		},
		 code: CodeBlock
	}
} satisfies PortableTextComponents;
