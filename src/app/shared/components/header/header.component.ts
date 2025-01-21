import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'shared-header',
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  public document: Document = inject(DOCUMENT);
  public auth = inject(AuthService);

  public isAuthenticated = this.auth.isAuthenticated$;
}
