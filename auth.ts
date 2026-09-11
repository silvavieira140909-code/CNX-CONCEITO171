import { supabase } from './supabase';
export async function signIn(email:string,password:string){if(!supabase)throw new Error('Supabase não configurado.'); return supabase.auth.signInWithPassword({email,password});}
export async function signUp(email:string,password:string,name:string){if(!supabase)throw new Error('Supabase não configurado.'); return supabase.auth.signUp({email,password,options:{data:{name}}});}
export async function signOut(){await supabase?.auth.signOut();}
