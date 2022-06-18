import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {

  @Input() public pageNumber: number;
  @Input() public pageSize: number;
  @Input() public totalCount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
