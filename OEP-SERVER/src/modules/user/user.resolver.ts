import { SUCCESS, UPDATE_ERROR } from '@/common/constants/code';
import { UserService } from './user.service';
import { User } from './models/user.entity';

export class UserResolver {
    constructor(private readonly userService: UserService) {}

    async create(params): Promise<boolean> {
        return await this.userService.create(params);
    }

    async del(id: string): Promise<boolean> {
        return await this.userService.del(id);
    }

    async updateUserInfo(id: string, params: any): Promise<any> {
        const res = await this.userService.update(id, params);
        if (res) {
            return {
                code: SUCCESS,
                message: 'updated successfully'
            };
        }
        return {
            code: UPDATE_ERROR,
            message: 'updated failed'
        }
    }

    async getUserInfo(id: string): Promise<User> {
        return await this.userService.find(id);
    }
 }