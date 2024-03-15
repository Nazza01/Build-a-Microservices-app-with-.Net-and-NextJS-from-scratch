namespace AuctionService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app) 
    {
        using var scope = app.Services.CreateScope();
        
    }
}
