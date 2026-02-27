import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  user,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { UserInterface } from '../models/user';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  currentUserValue = signal<UserInterface | undefined | null>(undefined);
  user$ = user(this.firebaseAuth);

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
      (response) => updateProfile(response.user, { displayName: username }),
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    this.user$.subscribe((user) => {
      if (user) {
        this.currentUserValue.set({
          email: user.email || '',
          username: user.displayName || '',
        });
      } else {
        this.currentUserValue.set(null);
      }
    });
    return from(promise);
  }
}
