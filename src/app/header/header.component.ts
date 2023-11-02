import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   
  headerElements = [
    { text: "Expériences", imageUrl:'assets/images/bodyMenu/bm_experienceIcon.png', title: "Expériences" },
    { text: "Parcours", imageUrl:'assets/images/bodyMenu/bm_carreerIcon.png', title: "Parcours" },
    { text: "Compétences", imageUrl:'assets/images/bodyMenu/bm_skillsIcon.png', title: "Compétences" }
  ]

  public click(title: string){
  var pos= document.getElementById(title);
  scrollTo({top: (pos?.offsetTop! -100), left:pos?.offsetLeft ,behavior:'smooth'})
  }
}
