/** Sprint 1: contrato de transporte para futura API. Não usado enquanto o app é local. */
export class ApiClient { constructor(private baseUrl:string) {} async get<T>(path:string):Promise<T>{const res=await fetch(`${this.baseUrl}${path}`,{credentials:'include'});if(!res.ok)throw new Error(`HTTP ${res.status}`);return res.json() as Promise<T>;} }
