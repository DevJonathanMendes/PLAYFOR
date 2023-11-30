import { Injectable } from '@nestjs/common';
import { CreateTestGfcInput } from './dto/create-test-gfc.input';
import { UpdateTestGfcInput } from './dto/update-test-gfc.input';

@Injectable()
export class TestGfcService {
	create(createTestGfcInput: CreateTestGfcInput) {
		return 'This action adds a new testGfc';
	}

	findAll() {
		return `This action returns all testGfc`;
	}

	findOne(id: number) {
		return `This action returns a #${id} testGfc`;
	}

	update(id: number, updateTestGfcInput: UpdateTestGfcInput) {
		return `This action updates a #${id} testGfc`;
	}

	remove(id: number) {
		return `This action removes a #${id} testGfc`;
	}
}
