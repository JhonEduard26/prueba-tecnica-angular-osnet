import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './dashboard-page.component.html',
  styles: ``
})
export class DashboardPageComponent {

}
