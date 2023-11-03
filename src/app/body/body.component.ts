import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})


export class BodyComponent {



  index = 0;
  citations = ["hihi", "Un data analyste hors norme", "Le créateur de ce site est juste trop bg"]
  infoElements = [
    { imageUrl: 'assets/images/infos/location_icon.png', text: 'Mitry-Mory (77) & Puteaux (92)', onclick: false, title: "France" },
    { imageUrl: 'assets/images/infos/linkedin_icon.png', onclick: true, title: "Linkedin", clickUrl: "https://www.linkedin.com/in/v-riviere/" },
    { imageUrl: 'assets/images/infos/github_icon.png', onclick: true, title: "Github", clickUrl: "https://github.com/VRiPro" }
  ]
  sections = [
    { title: "Expériences", data: [] },
    { title: "Parcours", data: [] },
    { title: "Compétences", data: [] }
  ]
  constructor(private http: HttpClient) {
    this.http.get('assets/data.json').subscribe({
      next: (data: any) => {
        this.sections[0].data = data.experiences
        this.sections[1].data = data.parcours
        this.sections[2].data = data.competences
      }


    })
  }
  public reveal() {
    var reveals = document.querySelectorAll(".subSectionToReveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }

  }

  public openLink(link: string) {
    window.open(
      link, "_blank"
    );
  }

  public launchCitations() {
    this.index = this.index === this.citations.length - 1 ? 0 : this.index + 1;
  }

  ngOnInit() {
    window.addEventListener("scroll", this.reveal);
    console.log(this.sections)
    setInterval(() => { this.launchCitations() }, 5000)
  }
}


