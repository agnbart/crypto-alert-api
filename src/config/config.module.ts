import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
          isGlobal: true, // Make the configuration module global
        }),
      ],
})
export class MyConfigModule {}
