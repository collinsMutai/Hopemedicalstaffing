import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  showBackToTop = false; // Controls visibility of the "Back to Top" button

  // Listen to the window scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 200) {
      this.showBackToTop = true; // Show the button after scrolling 200px
    } else {
      this.showBackToTop = false; // Hide the button when scrolled to top
    }
  }

  ngOnInit() {
    // Initial check to see if the page is scrolled down when the app loads
    if (window.scrollY > 200) {
      this.showBackToTop = true;
    }
  }

  // Scroll the page to the top
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
