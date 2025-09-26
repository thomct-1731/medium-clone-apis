import bcrypt from 'bcrypt';
import { USER_CONSTANTS } from '../../users/user.constant';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, USER_CONSTANTS.PASSWORD.SALT_ROUNDS);
}
