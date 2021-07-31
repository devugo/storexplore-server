import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user-dto';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../dto/jwt-payload';
export class UserService {
  private userRepository = getRepository(User);

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({ email, password: hashPassword });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1800s',
      });
      return { accessToken, email: user.email };
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
