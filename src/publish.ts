import { PurchaseOrder } from "./purchaseOrder";
import {connect} from "ts-nats";

export async function publish(p:PurchaseOrder):Promise<void> {
    const NATS_SERVER = process.env.NATS_SERVER || "nats";
    const nats = await connect({url: NATS_SERVER });
    nats.publish("purchase.order", JSON.stringify(p) );
}