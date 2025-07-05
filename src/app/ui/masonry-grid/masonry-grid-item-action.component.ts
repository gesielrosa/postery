import { Component, input } from '@angular/core';

@Component({
  selector: 'app-masonry-grid-item-action, [app-masonry-grid-item-action]',
  templateUrl: './masonry-grid-item-action.component.html',
  styleUrls: ['./masonry-grid-item-action.component.css'],
})
export class MasonryGridItemActionComponent {
  public label = input.required<string>();
  public icon = input.required<string>();
}
