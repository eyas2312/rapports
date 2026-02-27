import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAgyO_iPQwvfLPDX7cVSaPP5CLK89SYFPY',
  authDomain: 'rapports-eya.firebaseapp.com',
  projectId: 'rapports-eya',
  storageBucket: 'rapports-eya.firebasestorage.app',
  messagingSenderId: '440546610898',
  appId: '1:440546610898:web:77dc80f46cbbf4a161270b',
  measurementId: 'G-402Q2JC6GE',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
