import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @ApiOperation({ summary: "Criar nova doação" })
  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @ApiOperation({ summary: "Listar todas doações" })
  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @ApiOperation({ summary: "Listar doações por usuário" })
  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.donationsService.findAllByUserId(userId);
  }

  @ApiOperation({ summary: "Visualizar detalhes de uma doação" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar uma doação" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
    return this.donationsService.update(id, updateDonationDto);
  }

  @ApiOperation({ summary: "Deletar uma doação" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationsService.remove(id);
  }
}
