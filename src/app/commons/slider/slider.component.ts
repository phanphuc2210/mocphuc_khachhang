import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/slider.model';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit{
  // slides = [
  //   { img: '../../../assets/images/banner1.jpg' },
  //   { img: '../../../assets/images/banner2.jpg' },
  //   { img: '../../../assets/images/banner3.jpg' },
  // ];

  slides!: Slider[]

  slideConfig = { 
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "autoplay": true,
    "autoplaySpeed": 2000
  };
  
  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.sliderService.getSliderList().subscribe(res => {
      this.slides = res
    })
  }

  slickInit(e: any) {
    
  }
  breakpoint(e: any) {
    
  }
  afterChange(e: any) {
  
  }
  beforeChange(e: any) {
    
  }
}
