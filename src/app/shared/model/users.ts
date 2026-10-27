export interface Ires{
    name:string
}

export interface Iuser {
[x: string]: any;
 id: string;
 Uid: string;
 userName: string;
 userRole: string;
 experienceYears: number;
 status: boolean;
 profileDescription: string;
 skills: string[];
 address : {
    current:currentadd,
    permanent: permanentadd,
 }
 imageUrl: string;
}


export interface currentadd{
     
 country: string;
 state: string;
 city: string;
 zipcode: string;
 
}

export interface permanentadd{
 country: string;
 state: string;
 city: string;
 zipcode: string;
}