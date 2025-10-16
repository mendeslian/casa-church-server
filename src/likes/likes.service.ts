import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CREATED_LIKE, DELETED_LIKE, NOT_FOUND_LIKE } from "./likes.constants";

import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesRepository } from './likes.repository';
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "src/users/user.constants";

@Injectable()
export class LikesService {
constructor(private readonly likesRepository: LikesRepository) {}

  async create(createLikeDto: CreateLikeDto, tokenPayload: TokenPayloadDto) {
    const likeData = {
      ...createLikeDto,
    };

    if (createLikeDto.userId !== tokenPayload.id)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    const like = await this.likesRepository.create(likeData);
    return {
      message: CREATED_LIKE,
      like,
    };
  }

  async findAll() {
    return await this.likesRepository.findAll();
  }

  async findAllByUserId(userId: string, tokenPayload: TokenPayloadDto) {
    const like = await this.likesRepository.findByUserId(userId);
    if (!like) throw new NotFoundException(NOT_FOUND_LIKE);
    
    if (userId !== tokenPayload.id) 
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    
    return like;
  }

  async findOne(id: string, tokenPayload: TokenPayloadDto) {
    const like = await this.likesRepository.findById(id);
    if (!like) throw new NotFoundException(NOT_FOUND_LIKE);

    if (like.userId !== tokenPayload.id) 
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    return like;
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const like = await this.likesRepository.findById(id);
    if (!like) throw new NotFoundException(NOT_FOUND_LIKE);

    if (like.userId !== tokenPayload.id) 
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    await this.likesRepository.delete(id);
    return {
      message: DELETED_LIKE,
    };
  }
}
