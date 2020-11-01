import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { QueryResult, QueryConfig } from 'https://deno.land/x/postgres/query.ts';

const client = new Client({
    hostname : "localhost",
    port : 5434,
    user : "postgres",
    password : "matahari",
    database : "db_blogsri"
});

export async function select(qry : QueryConfig | QueryConfig[]):Promise<any[]> {
    await client.connect();
    let tables : any = [];
    let hasil : QueryResult | QueryResult[];
    if(Array.isArray(qry)) {
        hasil = await client.multiQuery(qry);
        hasil.forEach((obj) => {
            tables.push(obj.rowsOfObjects() );
        });
    }else {
        hasil = await client.query(qry);
        tables = hasil.rowsOfObjects();
    }
    await client.end();
    return tables;
}
export async function insert(qry : QueryConfig):Promise<any[]> {
    let tables : any = [];
    try {
        await client.connect();
        let hasil : QueryResult = await client.query(qry);
        await client.end();
        tables [0] = 'Sukses';
        tables [1] = 'Jumlah baris yg tersimpan'+hasil.rowCount;
    }catch (eror) {
        tables [0] = 'Gagal';
        tables [1] = `${eror}`;
    }
    return tables;
}