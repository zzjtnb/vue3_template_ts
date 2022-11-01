// 导入接口域名列表
import base from './base';
// 每个模块都应该有自己的接口文件去统一管理api
import {POST} from '@/utils/http/request';

export const Login = (data?: any) => POST(`${base.dev}/login`, data);
