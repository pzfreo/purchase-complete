import { createConnection, Repository } from "typeorm";
import { PurchaseOrder } from "./purchaseOrder";

let repositoryInstance : Repository<PurchaseOrder> | null = null;

export async function getRepository() : Promise<Repository<PurchaseOrder>> {
    if (repositoryInstance) {
        return repositoryInstance;
    }
    
    const conn = await createConnection({
            
        type: "postgres",
        host: process.env.DBHOST || "localhost",
        port: parseInt(process.env.DBPORT || "5432"),
        username: process.env.DBUSER || "postgres",
        password: process.env.DBPASSWORD || "mypass",
        database: process.env.DBDATABASE || "postgres",
        entities: [
            PurchaseOrder
        ],
        synchronize: true,
        logging: false

    });
    repositoryInstance =  conn.getRepository(PurchaseOrder);

    createSamplePO(repositoryInstance);
    
    return repositoryInstance;

}

function createSamplePO( repo:Repository<PurchaseOrder>) {
    let po = new PurchaseOrder();
    po.poNumber = "PO879888"
    po.customerNumber = "c1";
    po.date = new Date();
    po.isDeleted = false;
    po.paymentReference = "PREF001";
    po.lineItem = "00001";
    po.quantity = 5;
    
    (async () => {
        try {
            const p = await repo.create(po);
            //console.log(p);
            const result = await repo.save(p);
            // console.log(JSON.stringify(result));
        } catch (e) {
            // Deal with the fact the chain failed
        }
    })();
}

