import { Component } from '@angular/core';
import { Imageslider } from "../imageslider/imageslider";
import { About } from "../about/about";
import { Services } from "../services/services";
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [Imageslider, About, Services, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
