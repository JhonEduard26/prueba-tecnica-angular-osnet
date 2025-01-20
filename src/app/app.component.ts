import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthButtonComponent } from "./auth/components/auth-button/auth-button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prueba-tecnica-angular-osnet';
  private readonly authService = inject(AuthService);
}
