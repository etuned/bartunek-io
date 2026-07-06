import { cn } from "#/styles/utils"

function Footer({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"footer"> & { size?: "default" | "sm" }) {
    return (
        <footer
            data-slot="footer"
            data-size={size}
            className={cn(
                "group/footer pt-8 pb-4 w-full flex flex-col justify-center items-center gap-8",
                className
            )}
            {...props}
        />
    )
}

function FooterList({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"ul"> & { size?: "default" | "sm" }) {
    return (
        <footer
            data-slot="footer"
            data-size={size}
            className={cn(
                "group/footer h-35 w-full flex gap-8 justify-center items-center",
                className
            )}
            {...props}
        />
    )
}

function FooterItem({
    className,

    ...props
}: React.ComponentProps<"li">) {
    return (
        <footer
            data-slot="footer"
            className={cn(
                "group/footer flex gap-8 justify-center items-center",
                className
            )}
            {...props}
        />
    )
}

export {
    Footer,
    FooterList,
    FooterItem,
}