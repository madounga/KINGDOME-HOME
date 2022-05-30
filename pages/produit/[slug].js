import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Link,
  Typography,
  List,
  ListItem,
  Rating,
  Card,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import classes from '../../utils/classes';
import Image from 'next/image';
import { urlFor } from '../../utils/image';

export default function ProductScreen(props) {
  const { slug } = props;
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: '',
  });
  const { product, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`../liste_des_produits`);
        const produits = await res.json();

        const product = produits.filter((e) => {
          return e.id == slug;
        });

        //const produit = JSON.stringify(produit_);
        console.log(product);
        console.log(product.map((produit) => product.title));

        setState({ ...state, product, loading: false });
        return { props: { produit: product } };
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, [slug, state]);
  return (
    <Layout title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <NextLink href="/" passHref>
              <Link>
                <Typography>Retourner vers le résultat</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(product[0].thumbnailUrl)}
                alt={product[0].title}
                layout="responsive"
                width={640}
                height={640}
              />
            </Grid>
            <Grid md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    {product[0].title}
                  </Typography>
                </ListItem>
                <ListItem>Catégorie: {product[0].type}</ListItem>
                <ListItem>Prix: {product[0].price} €</ListItem>
                <ListItem>
                  <Rating value={product[0].rating} readOnly></Rating>
                  <Typography sx={classes.smallText}>
                    ({product[0].numReviews}) vues.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description: {product[0].description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Prix</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{product[0].price} €</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Stock</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{product[0].stock}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained">
                      + panier
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
