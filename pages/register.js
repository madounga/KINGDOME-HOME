import {
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Link,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Layout from '../components/Layout';
import Form from '../components/Form.js';

export default function RegisterScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {};
  return (
    <Layout title="Nouveau compte">
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Création d&apos;un compte
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Nom"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Le nom est trop court'
                        : 'Le nom est obligatoire'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: '/^([a-z0-9_-.]) +@([a-z0-9_-.]) +.([a-z]{2,4})$/;',
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Ton adresse E-mail est invalide'
                        : 'Email est obligatoire'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Mot de passe"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Ton mot de passe est très court'
                        : 'Le mot de passe est obligatoire'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirmer le mot de passe"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Le mot de passe de confirmation est très court'
                        : 'Le mot de passe de confirmation est obligatoire'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Créer le compte
            </Button>
          </ListItem>
          <ListItem>
            Vous avez déjà un compte ?{' '}
            <NextLink href={'/login'} passHref>
              <Link>Connexion</Link>
            </NextLink>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
