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

  public click(event:object){
    if(this.clickable){
      switch(this.title){
        case 'Contact':
          open('https://mail.google.com/mail/u/0/#inbox?compose=VpCqJRxkLSkqxLXJgznVmgPBQVFnqRVgvRxNvJCFsxNDfNXTPXRlcQRstvRCxKCCFRTXnsB', '_blank');
          break;
        case 'Linkedin':
          open('https://www.linkedin.com/in/v-riviere/', '_blank');
          break;
        case 'Github' :
          open('https://github.com/VRiPro', '_blank');
          break;
      }
    }

  }
}
