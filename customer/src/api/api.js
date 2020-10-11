/**
 * api接口统一管理
 */

 import { get } from './http'

 //列表查询
 export const apiList = p => get('/list',p);
 //新增用户
 export const apiAdd = p => get('/add',p);
 //删除用户
 export const apiDelete = p => get('/delete',p);
 //查询当前用户
 export const apiSearch = p => get('/search', p)
 //编辑用户
 export const apiEdit = p => get('/edit',p);