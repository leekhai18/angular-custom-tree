import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  animations: [
    trigger('expandedCollapsed', [
      state('expanded', style({
        height: '{{expandedHeight}}px',
      }), { params: { expandedHeight: '32' } }),
      state('collapsed', style({
        height: '32px',
      })),
      transition('expanded <=> collapsed', animate(175)),
    ]),
    trigger('appearedDisappeared', [
      state('appeared', style({
        opacity: '1',
        height: '32px'
      })),
      state('disappeared', style({
        opacity: '0',
        height: '0'
      })),
      transition('appeared <=> disappeared', animate(175)),
    ]),
  ]
})
export class NodeComponent implements AfterViewInit {

  @Input() index = 0;
  @Input() data: any = {};
  @Input() isExpanded = false;
  @Output() onToggle = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

}
