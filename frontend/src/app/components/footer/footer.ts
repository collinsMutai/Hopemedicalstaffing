import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  // Dynamically calculate the current year
  currentYear: number = new Date().getFullYear();
}
