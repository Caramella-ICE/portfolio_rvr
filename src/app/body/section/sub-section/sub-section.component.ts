import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.css']
})
export class SubSectionComponent {
  @Input() isRight!: Number
  @Input() title!: String
  @Input() content?: String
  @Input() date?: String
  @Input() location?: String
  @Input() list?: Boolean
  @Input() imageUrl?: String
  @Input() logoSection?:String
  @Input() logoSubSection?:any
  @Input() desc?: any


  logoTime = 'assets/images/bodyMenu/logoTime.png'
  logoLocation = 'assets/images/infos/location_icon.png'

  public  isArray(){
    return Array.isArray(this.logoSubSection)
  }

}
