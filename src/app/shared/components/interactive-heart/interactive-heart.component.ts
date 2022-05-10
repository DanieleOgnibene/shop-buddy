import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-interactive-heart',
  templateUrl: './interactive-heart.component.html',
  styleUrls: ['./interactive-heart.component.scss']
})
export class InteractiveHeartComponent {

  @Input() fontSize = 20;
  @Input() isFull = false;
  @Input() tooltipFull = '';
  @Input() tooltipEmpty = '';

  @Output() heartClick = new EventEmitter<void>();

}
