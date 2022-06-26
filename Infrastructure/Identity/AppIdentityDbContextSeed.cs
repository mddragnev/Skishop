using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Martin",
                    Email = "martin@test.com",
                    UserName = "martin@test.com",
                    Adress = new Adress
                    {
                        FirstName = "Martin",
                        LastName = "Dragnev",
                        Street = "10 The street",
                        City = "Sofia",
                        State = "Sofia",
                        ZipCode = "1000"
                    }
                };
                await userManager.CreateAsync(user, "Dr@gnev123");
            }
        }
    }
}