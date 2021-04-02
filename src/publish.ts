import { PurchaseOrder } from "./purchaseOrder";
import { connect, Client }  from "ts-nats";

let nats = null;

async function getConnection() : Promise<Client> {
    if (nats) return nats;
    const NATS_SERVER = process.env.NATS_SERVER || "nats";
    nats = await connect({url: NATS_SERVER });
    return nats;
}

export async function publishCreate(p:PurchaseOrder):Promise<void> {
    const connection = await getConnection()
    connection.publish("po.create", JSON.stringify(p) );
}
