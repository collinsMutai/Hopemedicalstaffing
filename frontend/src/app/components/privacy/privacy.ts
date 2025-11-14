import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.css']
})
export class Privacy {
  effectiveDate: string = new Date().toLocaleDateString(); // This will give today's date in a readable format
}
