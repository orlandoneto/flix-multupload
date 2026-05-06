import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { AppRoutes } from './routes/app-routes';
import { GlobalStyle } from './styles/global';

import { AppProvider, AuthProvider } from './providers';
import { theme } from './theme';

export default () => {
  return (
    <div className="page">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppProvider>
            <AppRoutes />
            <GlobalStyle />
            <ToastContainer />
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};
