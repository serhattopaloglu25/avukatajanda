import api from './api';

export interface User {
 id: number;
 email: string;
 username: string;
 full_name: string;
 role: string;
}

export const auth = {
 async login(username: string, password: string) {
   const formData = new FormData();
   formData.append('username', username);
   formData.append('password', password);
   
   const response = await api.post('/api/token', formData, {
     headers: { 'Content-Type': 'multipart/form-data' }
   });
   
   localStorage.setItem('token', response.data.access_token);
   localStorage.setItem('role', response.data.role);
   return response.data;
 },

 async register(data: any) {
   return await api.post('/api/register', data);
 },

 logout() {
   localStorage.removeItem('token');
   localStorage.removeItem('role');
   window.location.href = '/';
 },

 isAuthenticated() {
   return typeof window !== 'undefined' && !!localStorage.getItem('token');
 },

 getRole() {
   return typeof window !== 'undefined' ? localStorage.getItem('role') : null;
 },

 isAdmin() {
   return this.getRole() === 'admin';
 },

 isLawyer() {
   return this.getRole() === 'lawyer';
 },

 isClient() {
   return this.getRole() === 'client';
 }
};
