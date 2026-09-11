import {supabase} from './supabase';
export async function getPrivateVideoUrl(path:string){if(!supabase)throw new Error('Supabase não configurado.'); const {data,error}=await supabase.storage.from('private-videos').createSignedUrl(path,300); if(error)throw error; return data.signedUrl;}
export async function getDownloadUrl(path:string){if(!supabase)throw new Error('Supabase não configurado.'); const {data,error}=await supabase.storage.from('product-files').createSignedUrl(path,300); if(error)throw error; return data.signedUrl;}
