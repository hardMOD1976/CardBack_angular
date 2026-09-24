import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { CreateWishlistEntryDto } from './dto/create-wishlist-entry.dto';
import { WishlistService } from './wishlist.service';

@ApiTags('Wishlist')
@ApiBearerAuth('access-token')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  @Get() findAll(@CurrentUserId() userId: string) { return this.wishlistService.findAll(userId); }
  @Post() create(@CurrentUserId() userId: string, @Body() dto: CreateWishlistEntryDto) { return this.wishlistService.create(userId, dto); }
  @Delete(':id') remove(@CurrentUserId() userId: string, @Param('id') id: string) { return this.wishlistService.remove(userId, id); }
}
