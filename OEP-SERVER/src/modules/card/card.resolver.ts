import { FindOptionsWhere, Like } from 'typeorm';
import { Card } from './models/card.entity';
import {
  CARD_CREATE_FAIL,
  CARD_DEL_FAIL,
  CARD_NOT_EXIST,
  CARD_UPDATE_FAIL,
} from '../../common/constants/code';
import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { SUCCESS } from '@/common/constants/code';
import { CardResult, CardResults } from './dto/result-card.output';
import { CardInput } from './dto/card.input';
import { CardType } from './dto/card.type';
import { CardService } from './card.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { CurOrgId } from '@/common/decorators/current-org.decorator';

@Resolver(() => CardType)
@UseGuards(GqlAuthGuard)
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Query(() => CardResult)
  async getCardInfo(@Args('id') id: string): Promise<CardResult> {
    const result = await this.cardService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: 'Get successfully',
      };
    }
    return {
      code: CARD_NOT_EXIST,
      message: 'Consumption card information does not exist',
    };
  }

  @Mutation(() => CardResult)
  async commitCardInfo(
    @Args('params') params: CardInput,
    @Args('courseId') courseId: string,
    @CurUserId() userId: string,
    @CurOrgId() orgId: string,
    @Args('id', { nullable: true }) id: string,
  ): Promise<Result> {
    if (!id) {
      const res = await this.cardService.create({
        ...params,
        org: {
          id: orgId,
        },
        course: {
          id: courseId,
        },
        createdBy: userId,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: 'Created successfully',
        };
      }
      return {
        code: CARD_CREATE_FAIL,
        message: 'Created failed',
      };
    }
    const card = await this.cardService.findById(id);
    if (card) {
      const res = await this.cardService.updateById(card.id, {
        ...params,
        updatedBy: userId,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: 'Updated successfully',
        };
      }
      return {
        code: CARD_UPDATE_FAIL,
        message: 'Updated failed',
      };
    }
    return {
      code: CARD_NOT_EXIST,
      message: 'Consumption card information does not exist',
    };
  }

  @Query(() => CardResults)
  async getCards(
    @Args('courseId') courseId: string,
    @CurUserId() userId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<CardResults> {
    const where: FindOptionsWhere<Card> = {
      createdBy: userId,
      course: {
        id: courseId,
      },
    };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results] = await this.cardService.findCards({
      where,
    });
    return {
      code: SUCCESS,
      data: results,
      message: 'Get successfully',
    };
  }

  @Mutation(() => Result)
  async deleteCard(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.cardService.findById(id);
    if (result) {
      const delRes = await this.cardService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: 'Delete successfully',
        };
      }
      return {
        code: CARD_DEL_FAIL,
        message: 'Delete failed',
      };
    }
    return {
      code: CARD_NOT_EXIST,
      message: 'Store information does not exist',
    };
  }
}
