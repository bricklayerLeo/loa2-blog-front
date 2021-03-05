/**   
 * api接口统一管理
 */
import { get, post } from './http'

export const changePassword = p => post('/api/user/changePassword', p)
export const isExit = p => post('/api/user/isExit', p)
export const register = p => post('/api/user/register', p)
export const login = p => post('/api/user/login', p)
export const setting = p => get('/api/setting/userinfo', p)
export const upload = p => post('/api/utils/upload', p)
export const changeInfo = p => post('/api/user/changeInfo', p)
export const logout = p => post('/api/user/logout', p)
export const createBlog = p => post('/api/blog/create', p)
