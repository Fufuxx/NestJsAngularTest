import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';

import { AppServerModule } from '../src/main.server';
import { EventsModule } from './events/events.module';

import { AccountController } from './accounts.controller';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/nestangulartest/browser')
    }),
    EventsModule
  ],
  controllers: [AccountController]
})
export class AppModule {}
