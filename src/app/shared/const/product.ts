import { IProduct } from "../model/product";

export const productArray : IProduct[] = [ {
    pname : 'Iphone 15',
    pid : '1',
    pstatus : 'Delivered',
    canReturn : 0
},
{
        pname: 'Samsung Galaxy S24',
        pid: '2',
        pstatus: 'Dispatched',
        canReturn: 1
    },
    {
        pname: 'OnePlus 12',
        pid: '3',
        pstatus: 'In-Progress',
        canReturn: 0
    },
    {
        pname: 'MacBook Air M3',
        pid: '4',
        pstatus: 'Delivered',
        canReturn: 1
    },
    {
        pname: 'iPad Air',
        pid: '5',
        pstatus: 'Delivered',
        canReturn: 0
    }

]