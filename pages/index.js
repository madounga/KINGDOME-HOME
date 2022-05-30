import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/productitem';

export default function Home() {
  const [state, setState] = useState({
    produits: [],
    error: '',
    loading: true,
  });
  const { loading, error, produits } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('./liste_des_produits');
        const produits = await res.json();
        setState({ produits, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  });
  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {produits.map((prod) => (
            <Grid item md={4} key={prod.id}>
              <ProductItem product={prod}></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
