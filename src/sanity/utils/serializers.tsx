import type { PortableTextComponents } from '@portabletext/react';
import { Link } from '@tanstack/react-router';
import { AnchorExternalLink } from '#/components/ui/anchor-link';

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
    hardBreak: () => <><br /><br /></>

} satisfies PortableTextComponents;
