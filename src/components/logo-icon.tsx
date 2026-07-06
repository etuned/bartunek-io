import Logo from '../static/logo.svg?react';

function LogoIcon({ height = "2.7rem", width = "2.7rem", ...props }) {
    return (
        <Logo height={height} width={width} {...props} />
    )
};

export { LogoIcon }