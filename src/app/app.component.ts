import { Component, ElementRef, OnInit } from '@angular/core';
import { DataService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data: Array<any> = [];
  expandedState: { [key: string]: boolean } = {};

  constructor(
    private service: DataService,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit(): void {
    this.service.getData().subscribe(res => {
      this.data = this.objectToIteration(res);
      this.data.forEach((yearData) => {
        yearData[1].forEach((node: any, index: number) => {
          this.expandedState[`${yearData[0]}${index}`] = false;
        })
      })
    });
  }

  toggle(key: string, data: {rectBox: HTMLElement, scrollTarget: HTMLElement}) {
    if (this.expandedState[key] === true) {
      Object.keys(this.expandedState).forEach(key => this.expandedState[key] = false);
    } else {
      Object.keys(this.expandedState).forEach(key => this.expandedState[key] = false);
      this.expandedState[key] = true;
      setTimeout(() => {
        this.scroll(data.rectBox, data.scrollTarget);
      }, 200);
    }
  }

  objectToIteration(object: Object): Array<any> {
    return Object.entries(object).reverse();
  }

  scroll(item: HTMLElement, scrollTarget: HTMLElement) {
    const rect = item.getBoundingClientRect();
    const containerRect = this.elementRef.nativeElement.getBoundingClientRect();

    if (rect.height <= containerRect.height) {
      if (rect.bottom <= containerRect.bottom) {
        if (rect.top < containerRect.top) {
          setTimeout(() => {
            scrollTarget.scrollIntoView({ behavior: 'smooth' });
          });
        }
      } else {
        const top = this.elementRef.nativeElement.scrollTop + (rect.bottom - containerRect.bottom);
        this.elementRef.nativeElement.scrollTo({top: top, behavior: 'smooth'});
      }
    } else {
      setTimeout(() => {
        scrollTarget.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
}
