/**   
 * api接口统一管理
 */
import { get, post } from './http'

export const userLogin = p => post('/login', p)
export const isExit = p => post('/api/user/isExit', p)
export const register = p => post('/api/user/register', p)