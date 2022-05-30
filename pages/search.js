import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import classes from '../utils/classes';
import {
  Grid,
  ListItem,
  List,
  Box,
  Typography,
  MenuItem,
  Select,
  Rating,
  Button,
} from '@mui/material';
const prices = [
  {
    name: '1€ à 30€',
    value: 1 - 30,
  },
  {
    name: '31€ à 90€',
    value: 1 - 30,
  },
  {
    name: '91€ à 200€',
    value: 1 - 30,
  },
  {
    name: 'plus de 200€',
    value: 1 - 30,
  },
];
const ratings = [1, 2, 3, 4, 5];
export default function ScreenSearch() {
  const rooter = useRouter();
  const {
    category = 'all',
    query = 'all',
    price = 'all',
    rating = 'all',
    sort = 'all',
  } = rooter.query;
  const [state, setState] = useState({
    categories: [],
    products: [],
    error: '',
    loading: true,
  });

  const { loading, products, error } = state;
  const [categories, setCategories] = useRouter([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };
  });
  fetchCategories();

  const filterSearch = ({
    category,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {};
  return (
    <Layout title="Recherche">
      <Grid sx={classes.section} container spacing={2}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box sx={classes.fullWidth}></Box>
              <Typography>Catégorie</Typography>
              <Select fullWidth value={category}>
                <MenuItem value="all">Tout</MenuItem>
                {categories &&
                  categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
              </Select>
            </ListItem>
            <ListItem>
              <Box sx={classes.fullWidth}></Box>
              <Typography>Prix</Typography>
              <Select fullWidth value={prices}>
                <MenuItem value="all">Tout</MenuItem>
                {prices &&
                  prices.map((price) => (
                    <MenuItem key={price} value={price}>
                      {price}
                    </MenuItem>
                  ))}
              </Select>
            </ListItem>
            <ListItem>
              <Box sx={classes.fullWidth}></Box>
              <Typography>Avis</Typography>
              <Select fullWidth value={ratings}>
                <MenuItem value="all">Tout</MenuItem>
                {ratings &&
                  ratings.map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      <Rating value={rating} readOnly></Rating>
                      <Typography component="span">&amp; Up</Typography>
                    </MenuItem>
                  ))}
              </Select>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products && products.lenght != 0 ? products.length : 'Pas de'}{' '}
              résultats
            </Grid>
            (<Button onClick={() => router.push('/search')}>X</Button>)
          </Grid>
          <Grid item>
            <Typography component="span" sx={classes.sort}>
              <Select value={sort}>
                <MenuItem value="default">Par défaut</MenuItem>
                <MenuItem value="decroissant">Ordre décroissant</MenuItem>
                <MenuItem value="croissant">Ordre croissant</MenuItem>
                <MenuItem value="top">Plus plus noté</MenuItem>
              </Select>
            </Typography>
          </Grid>
        </Grid>
        <Grid sx={classes.section} container spacing={3}></Grid>
      </Grid>
    </Layout>
  );
}
