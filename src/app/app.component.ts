import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  showHeader = true;

  constructor(private router: Router) {
    this.showHeader = !window.location.pathname.includes('/auth');
    // Listen to route changes to update showHeader
    this.router.events.subscribe(() => {
      this.showHeader = !window.location.pathname.includes('/auth');
    });
  }

  title = 'rapport-viewer';
}
