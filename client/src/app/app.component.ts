import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Skishop';

  constructor(private basketService: BasketService) { }

  public ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: (response: any) => {
          console.log('initialized basket');
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }
}
