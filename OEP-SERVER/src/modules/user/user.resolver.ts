import { SUCCESS, UPDATE_ERROR } from "@/common/constants/code";
import { UserService } from "./user.service";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserInput } from "./dto/user-input.type";
import { Result } from "@/common/dto/result.type";
import { UserType } from "./dto/user.type";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@/common/guards/auth.guard";

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { description: "add new user" })
  async create(@Args("params") params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Mutation(() => Boolean, { description: "delete an user" })
  async del(@Args("id") id: string): Promise<boolean> {
    return await this.userService.del(id);
  }

  @Query(() => UserType, { description: "Query user info by id" })
  async getUserInfo(@Context() cxt: any): Promise<UserType> {
    const id = cxt.req.user.id;
    return await this.userService.find(id);
  }

  @Mutation(() => Result, { description: "update an user" })
  async updateUserInfo(
    @Args("id") id: string,
    @Args("params") params: UserInput
  ): Promise<Result> {
    const res = await this.userService.updateUserInfo(id, params);
    if (res) {
      return {
        code: SUCCESS,
        message: "updated successfully",
      };
    }
    return {
      code: UPDATE_ERROR,
      message: "updated failed",
    };
  }

  @Query(() => UserType, { description: "get user by id" })
  async find(@Args("id") id: string): Promise<UserType> {
    return await this.userService.find(id);
  }
}
