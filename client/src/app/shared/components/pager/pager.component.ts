import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() public totalCount: number;
  @Input() public pageSize: number;
  @Output() public pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }

}
