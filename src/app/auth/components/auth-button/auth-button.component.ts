import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  imports: [AsyncPipe],
  template: `
    @if (auth.isAuthenticated$ | async) {
    <button
      (click)="
        auth.logout({ logoutParams: { returnTo: document.location.origin } })
      "
    >
      Log out
    </button>
    } @else {
    <button (click)="auth.loginWithRedirect()">Log in</button>
    }
  `,
  styles: ``,
})
export class AuthButtonComponent {
  public document: Document = inject(DOCUMENT);
  public auth = inject(AuthService);
}
