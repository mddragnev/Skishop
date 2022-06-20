using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository basketRepository;

        public BasketController(IBasketRepository basketRepository)
        {
            this.basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string Id)
        {
            var basket = await basketRepository.GetBasketAsync(Id);
            return Ok(basket ?? new CustomerBasket(Id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            var updatedBasket = await basketRepository.UpdateBasketAsync(basket);
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await basketRepository.DeleteBasketAsync(id);
        }
    }
}