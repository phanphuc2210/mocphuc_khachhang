import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit{
  slides = [
    { img: '../../../assets/images/banner1.jpg' },
    { img: '../../../assets/images/banner2.jpg' },
    { img: '../../../assets/images/banner3.jpg' },
  ];

  slideConfig = { 
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "autoplay": true,
    "autoplaySpeed": 3000
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  
  constructor() {}

  ngOnInit(): void {
    
  }
}
