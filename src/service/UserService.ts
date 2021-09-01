import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user-dto';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../dto/jwt-payload';
import { RoleType } from '../enum/RoleType';
import { SaleManager } from '../entity/SaleManager';
export class UserService {
  private userRepository = getRepository(User);
  private saleManagerRepository = getRepository(SaleManager);

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
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
