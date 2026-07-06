import { cn } from "#/styles/utils"

function AnchorExternalLink({
    className,
    href,
    ...props
}: React.ComponentProps<"a">) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-slot="anchor-external-link"
            className={cn(
                "group/anchor-external-link text-brand-magenta hover:text-brand-hotmag hover:backdrop-blur-lg",
                className
            )}
            {...props}
        />
    )
}

export {
    AnchorExternalLink
}