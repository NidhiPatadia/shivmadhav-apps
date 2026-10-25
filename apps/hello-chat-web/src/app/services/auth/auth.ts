import { Service, signal } from '@angular/core';
import {
  signInAnonymously,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { from } from 'rxjs';
import { auth } from '../../configs';

@Service()
export class AuthService {
  // 1. Private writable Reactive Signal representing the current authenticated user
  private readonly _user = signal<User | null>(null);

  // 2. Public read-only signal exposed to components
  public readonly user = this._user.asReadonly();

  constructor() {
    onAuthStateChanged(auth, (firebaseUser) => {
      this._user.set(firebaseUser);
    });
  }

  // Trigger Anonymous Login
  loginAnonymously() {
    return from(signInAnonymously(auth));
  }

  // Get current JWT token asynchronously (forces refresh if expired)
  async getToken(): Promise<string | null> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return null;
    }
    return currentUser.getIdToken(true);
  }
}
