import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './app/database/database.module';
import { AcquiringModule } from './app/controllers/acquiring/acquiring.module';
import { BalanceModule } from './app/controllers/balance/balance.module';
import { MD_From_BPModule } from './app/controllers/md_from_bp/md_from_bp.module';
import { MD_From_UsersModule } from './app/controllers/md_from_users/md_from_users.module';
import { Meters_DataModule } from './app/modules/meters_data/meters_data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`envs/.${process.env.NODE_ENV.trim()}.env`],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        messageKey: 'message',
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
        timestamp: () => `,"@timestamp":"${new Date(Date.now()).toISOString()}"`,
      },
    }),
    DatabaseModule,
    AcquiringModule,
    BalanceModule,
    MD_From_BPModule,
    MD_From_UsersModule,
    Meters_DataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}