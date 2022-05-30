import { ThemeProvider } from '@emotion/react';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';

import {
  Typography,
  Link,
  AppBar,
  CssBaseline,
  createTheme,
  Box,
  Container,
  Toolbar,
  Badge,
  List,
  ListItem,
  Drawer,
  Divider,
  ListItemText,
  useMediaQuery,
  InputBase,
} from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Head from 'next/head';
import NextLink from 'next/link';
import classes from '../utils/classes';
import Image from 'next/image';

export default function Layout({ title, description, children }) {
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.9rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#458889',
      },
      secondary: {
        main: '#208080',
      },
      third: {
        main: '#f2842b',
      },
      panier_color: {
        main: 'rgb(242, 132, 43, 0.8)',
      },
    },
  });

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();
  });
  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <>
      <Head>
        <title>
          {title ? `${title} = KINGDOME` : 'KINGDOME'}
          {description && (
            <meta name="description" content={description}></meta>
          )}
        </title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
            </Box>

            <NextLink href="/" passHref>
              <Link>
                <Image
                  src="/images/logo_chaise.png"
                  alt="logo KINGDOM"
                  width={50}
                  height={50}
                />
              </Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.brand}>KINGDOME</Typography>
              </Link>
            </NextLink>
            <Box sx={isDesktop ? classes.visible : classes.hidden}>
              <form onSubmit>
                <Box sx={classes.searchForm}>
                  <InputBase
                    name="query"
                    sx={classes.searchInput}
                    placeholder="Rechercher un meuble"
                  />
                  <IconButton
                    type="submit"
                    sx={classes.searchButton}
                    arial-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              </form>
            </Box>
            <Box>
              <Drawer
                anchor="left"
                open={sidebarVisible}
                onClose={sidebarCloseHandler}
              >
                <List>
                  <ListItem>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography>Shopping par catégorie</Typography>
                      <IconButton
                        arial-label="close"
                        onClick={sidebarCloseHandler}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider tight />
                  {categories.map((category) => (
                    <NextLink
                      key={category}
                      href={`/search?category=${category}`}
                      passHref
                    >
                      <ListItem
                        button
                        component="a"
                        onClick={sidebarCloseHandler}
                      >
                        <ListItemText primary={category}></ListItemText>
                      </ListItem>
                    </NextLink>
                  ))}
                </List>
              </Drawer>

              <Box>
                <NextLink href="cart" passHref>
                  <Link>
                    <Typography component="span">
                      Panier
                      <Badge
                        xs={classes.panier}
                        color="panier_color"
                        badgeContent={2}
                      ></Badge>
                    </Typography>
                  </Link>
                </NextLink>
              </Box>

              <Box>
                <NextLink href="/login" passHref>
                  <Link>Connexion</Link>
                </NextLink>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Typography>All right reserved. KINGDOME 2022</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
