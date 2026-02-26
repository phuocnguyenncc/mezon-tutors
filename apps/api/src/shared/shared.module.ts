import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './services/app-config.service';

@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class SharedModule {}
