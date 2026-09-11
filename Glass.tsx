import type {ReactNode} from 'react'; export function Glass({children,className='' }:{children:ReactNode;className?:string}){return <div className={`glass ${className}`}>{children}</div>}
