import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-tiooc3gc8tbxb17b.us.auth0.com',
      clientId: 'LgD9CSqOtg1pTSxb8c752feOhkvzN2Z3',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
  ],
};
