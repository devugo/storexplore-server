import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user-dto';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../dto/jwt-payload';
import { RoleType } from '../enum/RoleType';
import { SaleManager } from '../entity/SaleManager';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { StoreOwner } from '../entity/StoreOwner';
export class UserService {
  private userRepository = getRepository(User);
  private saleManagerRepository = getRepository(SaleManager);
  private storeOwnerRepository = getRepository(StoreOwner);

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const user = this.userRepository.create({
        email,
        password: hashPassword,
        role: role ? role : RoleType.ADMIN,
      });
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userRepository.findOne({ email });
    const saleManager = await this.saleManagerRepository.findOne({ user });
    const storeOwner = await this.storeOwnerRepository.findOne({ user });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_DURATION,
      });
      return {
        accessToken,
        email: user.email,
        role: user.role,
        id: user.id,
        saleManager,
        storeOwner,
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async retain(email: string) {
    const user = await this.userRepository.findOne({ email });
    let saleManager;
    if (user) {
      saleManager = await this.saleManagerRepository.findOne({ user });
      const storeOwner = await this.storeOwnerRepository.findOne({ user });

      return {
        email: user.email,
        role: user.role,
        id: user.id,
        saleManager,
        storeOwner,
      };
    } else {
      throw new Error('Not Found');
    }
  }

  async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
    const { password } = changePasswordDto;
    const user = await this.userRepository.findOne({ email });
    if (user) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      await this.userRepository.save(user);
      return user;
    } else {
      throw new Error('Not Found');
    }
  }
}
