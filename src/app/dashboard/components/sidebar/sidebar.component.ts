import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'dashboard-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  public auth = inject(AuthService);
}
