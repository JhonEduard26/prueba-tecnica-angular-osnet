import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'dashboard-navbar',
  imports: [AsyncPipe],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  public auth = inject(AuthService);
  public document = inject(DOCUMENT);
  public user$ = this.auth.user$;
}
