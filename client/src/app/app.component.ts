import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Skishop';

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  public ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }

  private loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: (response: any) => {
          console.log('initialized basket');
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  private loadUser() {
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe({
      next: () => console.log('loaded user'),
      error: (error: any) => console.log(error)
    });

  }
}
