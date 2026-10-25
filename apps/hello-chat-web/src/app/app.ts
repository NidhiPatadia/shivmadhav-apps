import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NxWelcome } from './nx-welcome';
import { AuthService } from './services';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {
  protected title = 'hello-chat-web';

  authService = inject(AuthService);
  private http = inject(HttpClient);

  ngOnInit() {
    this.authService.loginAnonymously().subscribe({
      next: (res) => console.log('Angular Anon Login Success:', res.user.uid),
      error: (err) => console.error('Login Error:', err),
    });
  }

  queryGraphQL() {
    const graphqlQuery = { query: '{ viewer { uid } }' };
    // The interceptor automatically handles the Bearer token attachment
    this.http
      .post('https://your-backend-api.com/graphql', graphqlQuery)
      .subscribe({
        next: (res) => console.log('GraphQL Response:', res),
        error: (err) => console.error('GraphQL Error:', err),
      });
  }
}
