import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  user,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  currentUser = signal<string | null>(null);
  user$ = user(this.firebaseAuth);

  // add currentUser signal to local storage for persistence
  private saveUserToLocalStorage(userEmail: string | null, displayName: string | null) {
    if (userEmail) {
      localStorage.setItem('currentUser', userEmail);
      localStorage.setItem('currentUserDisplayName', displayName || '');
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  constructor() {
    // Restore user on service initialization
    this.user$.subscribe((authUser) => {
      if (authUser) {
        this.currentUser.set(authUser.email || null);
        this.saveUserToLocalStorage(authUser.email || null, authUser.displayName || null);
      } else {
        this.currentUser.set(null);
      }
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
      (response) => updateProfile(response.user, { displayName: username }),
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
