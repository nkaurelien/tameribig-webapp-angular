import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  medias = [
    {
        'title': 'Images',
      'logo': 'assets/images/camera.png',
        'text': `lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, animivoluptatem inventore voluptate tenetur`
    },
    {
      'title': 'Videos',
      'logo': 'assets/images/video.png',
      'text': `lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, animivoluptatem inventore voluptate tenetur`
    },
    {
      'title': 'Audios',
      'logo': 'assets/images/audio.png',
      'text': `lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, animivoluptatem inventore voluptate tenetur`
    },
    {
      'title': 'Créas',
      'logo': 'assets/images/illustration.png',
      'text': `lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, animivoluptatem inventore voluptate tenetur`
    },
  ]


  steps = [
    {
      'image': 'assets/images/partner/steps/1.jpg',
    },
    {
      'image': 'assets/images/partner/steps/2.jpg',
    },
    {
      'image': 'assets/images/partner/steps/3.jpg',
    },
    {
      'image': 'assets/images/partner/steps/4.jpg',
    },
  ]

  ngOnInit() {
  }

}
