import { PurchaseOrder } from "./purchaseOrder";
// import { Repository } from "typeorm";
import { getRepository } from "./db";

// A post request should not contain an id.
export type POCreationParams = Pick<PurchaseOrder, "poNumber" | "lineItem" | "quantity" | "customerNumber" | "paymentReference">;

export class POService {
 


  public async get(uuid: string): Promise<PurchaseOrder> | null {
    try {
      const repo = await getRepository();
      console.log(uuid);
      const po = await repo.findOne(uuid);
      console.log(po);
      return po;
    }
    catch (error) {
      return null;
    }

  }

  public async create(poCreationParams: POCreationParams): Promise<PurchaseOrder> {
    console.log(poCreationParams);
    try {
      const repo = await getRepository();
      const po : PurchaseOrder = await repo.create(poCreationParams);
      console.log(po);
      const results = await repo.save(po);
      return po;
    } catch (error) {
      console.error(error);
      throw new Error("invalid input");
    }
  }
}