import { Injectable, UnauthorizedException } from '@nestjs/common';
import { user } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import  * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import {SignUpDto} from  "./dto/signup.dto"
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(user)
        private readonly userRepository:Repository<user>,
        private jwtService: JwtService
    
        ) {}
       
       async signUp(signUpDto: SignUpDto): Promise<{token: string}>{
        const {name,email,password}=signUpDto;

        const hasedPassword= await bcrypt.hash(password, 10)

      const user = await this.userRepository.create({
        name,
        email,
        password:hasedPassword
      });

          const token =this.jwtService.sign({id: user.id})
          return { token };

          }
        
          async login(loginDto:LoginDto): Promise<{token:string}>{
            const {email,password}=loginDto;
              
            const user= await this.userRepository.findOne({
              where:{email}
            });

            if(!user){
              throw new UnauthorizedException('Invalid Email or Password');
            }

            const ispasswordMatched =await bcrypt.compare(password,user.password)

            if(!ispasswordMatched){
              throw new UnauthorizedException('Invalid Email or Password');
            }

            const token =this.jwtService.sign({id: user.id})
              return { token };
          }
       
}
