import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { Logout, Person, Email, AccountCircle } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from 'notistack';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      enqueueSnackbar('Logout realizado com sucesso!', { variant: 'success' });
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
      enqueueSnackbar('Erro ao fazer logout', { variant: 'error' });
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Não disponível';
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            size="large"
            aria-label="logout"
            color="inherit"
            onClick={handleLogout}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Perfil do Usuário */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={currentUser?.photoURL || ''}
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                >
                  {currentUser?.displayName?.charAt(0) || <AccountCircle />}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {currentUser?.displayName || 'Usuário'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Informações da Conta */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informações da Conta
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ mr: 2, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="subtitle2">Nome</Typography>
                      <Typography variant="body2">
                        {currentUser?.displayName || 'Não informado'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 2, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="subtitle2">Email</Typography>
                      <Typography variant="body2">
                        {currentUser?.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccountCircle sx={{ mr: 2, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="subtitle2">UID</Typography>
                      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                        {currentUser?.uid}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2">Email Verificado</Typography>
                      <Typography variant="body2">
                        {currentUser?.emailVerified ? 'Sim' : 'Não'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2">Último Login</Typography>
                      <Typography variant="body2">
                        {formatDate(currentUser?.metadata?.lastSignInTime || null)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2">Conta Criada</Typography>
                      <Typography variant="body2">
                        {formatDate(currentUser?.metadata?.creationTime || null)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Ações */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Bem-vindo ao seu Dashboard!
              </Typography>
              <Typography variant="body1" paragraph>
                Você está logado com sucesso. Este é um exemplo de área protegida que só usuários autenticados podem acessar.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Sair da Conta
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
