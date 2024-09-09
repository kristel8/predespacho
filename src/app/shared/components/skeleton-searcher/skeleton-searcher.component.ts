import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-searcher',
  templateUrl: './skeleton-searcher.component.html',
  styleUrls: ['./skeleton-searcher.component.scss']
})
export class SkeletonSearcherComponent {
  @Input() isMostrar: boolean = false;
  @Input() type: string = 'searcher';
  @Input() col: number = 2;

}
