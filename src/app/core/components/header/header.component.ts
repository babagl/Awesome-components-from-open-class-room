import { Component } from '@angular/core';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly MatToolbar = MatToolbar;
}
