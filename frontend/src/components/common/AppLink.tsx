import React, { forwardRef, useMemo } from "react";
import Link, { LinkProps } from "next/link";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const { href, as, children, ...otherProps } = props;

  const nextRouter = useMemo(() => href || "#", [href]);

  return (
    <Link href={nextRouter} as={as} passHref={true} ref={ref}>
      <MuiLink underline="hover" {...otherProps}>
        {children}
      </MuiLink>
    </Link>
  );
});

AppLink.displayName = "AppLink";

export type AppLinkProps = LinkProps & MuiLinkProps;

export default AppLink;
