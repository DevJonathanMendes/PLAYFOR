import { Module } from '@nestjs/common';
import { TestGfcService } from './test-gfc.service';
import { TestGfcResolver } from './test-gfc.resolver';

@Module({
	providers: [TestGfcResolver, TestGfcService],
})
export class TestGfcModule {}
