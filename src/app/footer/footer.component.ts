import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.css'
  ]
})
export class FooterComponent {
  footerLinks:Array<Array<any>> = [
    [
      { title: 'Expériences', click:()=> this.click('Expériences') },
      { title: 'Parcours', click: ()=> this.click('Parcours') },
      { title: 'Compétences', click: ()=> this.click('Compétences')}
    ],
    [
      { title: 'E-mail', click: ()=> this.openLink('https://mail.google.com/mail/u/0/#inbox?compose=CllgCJTJnsmhBTncmlVnLtCGMRlxrlnlkdXdSsTvPKpTBNgGPhwnfWlmVMQBcfDFkspgVCnxCLB') },
      { title: 'Linkedin', click: ()=> this.openLink('https://www.linkedin.com/in/v-riviere/') },
      { title: 'Github', click: ()=> this.openLink('https://github.com/VRiPro') }
    ]
  ]
  helpMeUrl= 'assets/images/bodyMenu/bm_helpIcon.png'
  helpMeText="Le site web a été développé avec Angular dans un but lucratif et dans l'intérêt d'être hébergé sur GitHub Pages. Il se distingue par son excellence et son design soigné, offrant ainsi une expérience en ligne de haute qualité. L'anonymat du développeur est préservé, mais son travail témoigne d'un engagement à fournir une plateforme web accessible au plus grand nombre. L'objectif de ce projet est de répondre aux besoins du public cible tout en maintenant la simplicité et l'accessibilité. Dans l'ensemble, ce site web incarne une fusion de compétence, d'ambition et d'accessibilité pour offrir une expérience en ligne remarquable."

  public click(title: string) {
    var pos = document.getElementById(title);
    scrollTo({ top: (pos?.offsetTop! - 100), left: pos?.offsetLeft, behavior: 'smooth' })
  }

  public openLink(link: string) {
    window.open(
      link, "_blank"
    );
  }

}
