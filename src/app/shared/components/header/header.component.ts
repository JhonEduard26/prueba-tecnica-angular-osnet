import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Category } from '../../types';

@Component({
  selector: 'shared-header',
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  @Input() categories: Category[] = [];

  public document: Document = inject(DOCUMENT);
  public auth = inject(AuthService);

  public isAuthenticated = this.auth.isAuthenticated$;
}
