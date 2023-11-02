import { Component, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})

export class SectionComponent {
@Input() data!:any;
@Input()title:any;


ngOnInit(){
}
}
