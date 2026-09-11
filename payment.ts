export type CheckoutItem={id:string;title:string;price:number};
/** Gateway-agnostic payment seam. Plug Stripe, Mercado Pago, Asaas, etc. into this function/server endpoint later. */
export async function startCheckout(items:CheckoutItem[]):Promise<{url?:string;message:string}>{void items; return {message:'Gateway ainda não configurado. Conecte seu provedor no backend antes de receber pagamentos reais.'};}
