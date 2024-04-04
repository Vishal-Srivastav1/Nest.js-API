import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
    
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.registerAsync({
//       inject:[ConfigService],
//       useFactory: async(config:ConfigService)=>{
//         return{
//           secret:config.get<string>('JWT_SECRET') ,//process.env.JWT_SE
//           signOptions:{
//             expiresIn:config.get<string | number>('JWT_EXPIRE') ,//process.env.JWT_SE
//           },
//         };
//       },
//     }),
//     TypeOrmModule.forFeature([user]),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}


@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([user]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}