import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";

import { ApiOperation, ApiSecurity } from "@nestjs/swagger";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: "Criar nova curtida" })
  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.likesService.create(createLikeDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todas curtida" })
  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @ApiOperation({ summary: "Listar curtidas por usuário" })
  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.likesService.findAllByUserId(userId, tokenPayload);
  }

  @ApiOperation({ summary: "Visualizar detalhes de uma curtida" })
  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.likesService.findOne(id, tokenPayload);
  }

  @ApiOperation({ summary: "Deletar uma curtida" })
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.likesService.remove(id, tokenPayload);
  }
}
