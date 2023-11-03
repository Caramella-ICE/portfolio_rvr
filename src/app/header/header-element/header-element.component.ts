import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-element',
  templateUrl: './header-element.component.html',
  styleUrls: ['./header-element.component.css']
})
export class HeaderElementComponent {
  @Input() imageUrl!:string;
  @Input() span?:string = "";
  @Input() clickable?: boolean = false;
  @Input() title?:string;

  
}
