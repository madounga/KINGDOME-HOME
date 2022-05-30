import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import classes from '../utils/classes';
import { urlForThumbnail } from '../utils/image';

export default function ProductItem({ product }) {
  return (
    <Card>
      <NextLink href={`/produit/${product.id}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.thumbnailUrl)}
            title={product.title}
          ></CardMedia>
          <CardContent>
            <Typography>{product.title}</Typography>
            <Rating value={product.rating} readOnly></Rating>
            <Typography sx={classes.smallText}>
              ({product.numReviews}) vues
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>{product.price} €</Typography>
        <Button size="small" color="third">
          Ajouter au panier
        </Button>
      </CardActions>
    </Card>
  );
}
