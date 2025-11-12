import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {
  // Track the state of the mobile menu (open/close)
  isMenuOpen = signal(false);

  // Toggle the mobile menu
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  // Close the mobile menu when a link is clicked
  handleLinkClick() {
    this.isMenuOpen.set(false);
  }

  // Define the nav links with routes matching your app.routes.ts
  navLinks = [
    { path: '', label: 'Home', isRouterLink: true },
    { path: '#about', label: 'About', isRouterLink: false },  // Use hash for scroll
    { path: '#services', label: 'Services', isRouterLink: false },
    { path: '#contact', label: 'Contact', isRouterLink: false },
    { path: '/jobs', label: 'Jobs', isRouterLink: true },
  ];
}
