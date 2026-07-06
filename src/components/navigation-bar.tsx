import { IconBrandBluesky, IconBrandLinkedin } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { BLUESKY_URL, LINKEDIN_URL } from '#/const';
import { LogoIcon } from './logo-icon';
import { AnchorExternalLink } from './ui/anchor-link';
import { Navigation, NavigationItems, NavigationList } from './ui/navigation';
export function NavigationBar() {
	return (
		<Navigation>
			<NavigationList>
				<NavigationItems className="basis-full text-center sm:basis-1/3">
					<Link to="/">
						<LogoIcon id="logo" aria-label="home" />
					</Link>
				</NavigationItems>
				<NavigationItems>
					<Link to="/blog">Blog</Link>
				</NavigationItems>
				<NavigationItems>
					<Link to="/projects">Projects</Link>
				</NavigationItems>
				<NavigationItems>
					<Link to="/about">About</Link>
				</NavigationItems>
				<NavigationItems>
					<AnchorExternalLink href={LINKEDIN_URL}>
						<IconBrandLinkedin className="sms" />
					</AnchorExternalLink>
				</NavigationItems>
				<NavigationItems>
					<AnchorExternalLink href={BLUESKY_URL}>
						<IconBrandBluesky className="sms" />
					</AnchorExternalLink>
				</NavigationItems>
			</NavigationList>
		</Navigation>
	);
}
