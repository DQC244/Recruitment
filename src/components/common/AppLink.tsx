import React, { memo, useMemo } from "react";
import Link, { LinkProps } from "next/link";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

const AppLink = (props: AppLinkProps) => {
  const { href, as, children, ...otherProps } = props;

  const nextRouter = useMemo(() => href || "#", [href]);

  return (
    <Link href={nextRouter} as={as} passHref={true}>
      <MuiLink underline="hover" {...otherProps}>
        {children}
      </MuiLink>
    </Link>
  );
};

type AppLinkProps = LinkProps & MuiLinkProps;

export default memo(AppLink);
