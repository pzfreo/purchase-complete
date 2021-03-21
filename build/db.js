"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const purchaseOrder_1 = require("./purchaseOrder");
let repositoryInstance = null;
async function getRepository() {
    if (repositoryInstance) {
        return repositoryInstance;
    }
    const conn = await typeorm_1.createConnection({
        type: "postgres",
        host: process.env.DBHOST || "localhost",
        port: parseInt(process.env.DBPORT || "5432"),
        username: process.env.DBUSER || "postgres",
        password: process.env.DBPASSWORD || "mypass",
        database: process.env.DBDATABASE || "postgres",
        entities: [
            purchaseOrder_1.PurchaseOrder
        ],
        synchronize: true,
        logging: false
    });
    repositoryInstance = conn.getRepository(purchaseOrder_1.PurchaseOrder);
    createSamplePO(repositoryInstance);
    return repositoryInstance;
}
exports.getRepository = getRepository;
function createSamplePO(repo) {
    let po = new purchaseOrder_1.PurchaseOrder();
    po.poNumber = "PO879888";
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
        }
        catch (e) {
            // Deal with the fact the chain failed
        }
    })();
}
