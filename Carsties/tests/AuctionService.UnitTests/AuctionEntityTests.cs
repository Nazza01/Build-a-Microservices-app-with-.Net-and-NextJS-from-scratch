using Microsoft.AspNetCore.Mvc;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservePrice_ReservePriceGtZero_True()
    {
        // arrange 
        var auction = new Auction()
        {
            Id = Guid.NewGuid(),
            ReservePrice = 10
        };

        // act
        var result = auction.HasReservePrice();

        // asset
        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReservePriceISZero_True()
    {
        // arrange 
        var auction = new Auction()
        {
            Id = Guid.NewGuid(),
            ReservePrice = 0
        };

        // act
        var result = auction.HasReservePrice();

        // asset
        Assert.False(result);
       
    }
}