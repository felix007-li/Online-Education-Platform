import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models/user.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
    ) {}

    // create new user
    async create(entity: DeepPartial<User>): Promise<boolean> { //DeepPartial: turn attribute to optional attribute
        const res = await this.UserRepository.insert(entity);
        if (res && res.raw.affectedRows > 0) {
            return true;
        }
        return false;
    }

    // delete user
    async del(id: string): Promise<boolean> {
        const res = await this.UserRepository.delete(id);
        if (res.affected > 0) {
            return true
        }
        return false
    }

    // update an user
    async updateUserInfo(id: string, entity: DeepPartial<User>): Promise<boolean> {
        const res = await this.UserRepository.update(id, entity);
        if (res.affected > 0) {
            return true;
        }
        return false
    }

    // search an user
    async find(id: string): Promise<User> {
        const res = await this.UserRepository.findOne({
            where: {
                id,
            },
        });
        return res;
    }

    // search an user by tel
    async findByTel(tel: string): Promise<User> {
        const res = await this.UserRepository.findOne({
            where: {
                tel,
            },
        });
        return res;
    }

     // update code for an user
     async updateCode(id: string, code: string): Promise<boolean> {
        const res = await this.UserRepository.update(id, {
            code,
            codeCreateTimeAt: new Date(),
        });
        if (res.affected > 0) {
            return true;
        }
        return false
    }
}