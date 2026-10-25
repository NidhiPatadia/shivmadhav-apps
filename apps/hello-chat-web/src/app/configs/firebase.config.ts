import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environments/environment';

// Initialize Firebase with web app's Firebase configuration
const app = initializeApp(environment.firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
