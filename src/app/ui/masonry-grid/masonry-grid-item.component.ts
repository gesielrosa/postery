import { Component, input } from '@angular/core';

@Component({
  selector: 'app-masonry-grid-item, [app-masonry-grid-item]',
  templateUrl: './masonry-grid-item.component.html',
  styleUrls: ['./masonry-grid-item.component.css'],
})
export class MasonryGridItemComponent {
  public title = input.required<string>();
  public imageSrc = input.required<string>();
}
