export type ProductType='download'|'apk'|'video'|'external';
export interface Product{id:string;title:string;description:string;price:number;type:ProductType;image_url?:string;file_path?:string;external_url?:string;featured?:boolean;active?:boolean;}
export interface Profile{id:string;email:string;name?:string;role:'user'|'admin';}
