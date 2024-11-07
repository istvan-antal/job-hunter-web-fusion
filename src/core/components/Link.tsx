import MuiLink, { type LinkProps } from '@mui/material/Link';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ ...props }: LinkProps & RouterLinkProps) => <MuiLink component={RouterLink} {...props} />;

export default Link;
