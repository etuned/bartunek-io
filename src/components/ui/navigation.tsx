import { cn } from "#/styles/utils"

function Navigation({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"nav"> & { size?: "default" | "sm" }) {
    return (
        <nav
            data-slot="navigation"
            data-size={size}
            className={cn(
                "group/navigation",
                className
            )}
            {...props}
        />
    )
}


function NavigationList({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"ul"> & { size?: "default" | "sm" }) {
    return (
        <ul
            data-slot="navigation-list"
            data-size={size}
            className={cn(
                "group/navigation-list",
                className
            )}
            {...props}
        />
    )
}

function NavigationItems({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"li"> & { size?: "default" | "sm" }) {
    return (
        <li
            data-slot="navigation-items"
            data-size={size}
            className={cn(
                "group/navigation-items",
                className
            )}
            {...props}
        />
    )
}



export {
    Navigation,
    NavigationList,
    NavigationItems,
}