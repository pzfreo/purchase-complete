import { PurchaseOrder } from "./purchaseOrder";
import { getRepository } from "./db";

// A post request should not contain an id or date
export type POCreationParams = Pick<PurchaseOrder, "poNumber" | "lineItem" | "quantity" | "customerNumber" | "paymentReference">;

export class POService {
 


  public async getOne(uuid: string): Promise<PurchaseOrder> | null {
    try {
      const repo = await getRepository();
      const po = await repo.findOne(uuid);
      if (po.isDeleted) {
        return null; 
      }
      return po;
    }
    catch (error) {
      console.error(error);
      return null;
    }

  }

  public async getAll(): Promise<PurchaseOrder[]>  {
      const repo = await getRepository();
      const pos = await repo.find();
      return pos;
  }

  public async create(poCreationParams: POCreationParams): Promise<PurchaseOrder> {
  
    try {
      const repo = await getRepository();
      const po : PurchaseOrder = await repo.create(poCreationParams);
      await repo.save(po);
      return po;
    } catch (error) {
      console.error(error);
      throw new Error("invalid input");
    }
  }

  public async update(uuid: string, updatedOrder: POCreationParams): Promise<PurchaseOrder> | null {
    const repo = await getRepository();
    try {
      console.log(uuid)
      const po = await repo.findOne(uuid);
      console.log(uuid, po)
      if (!po) return null; // not found return null
    
      try {  
        repo.merge(po, updatedOrder);
        await repo.save(po);
        return po;
      }
      catch (error) // problem merging
      {
        console.error(error);
        throw new Error("invalid input");
      }

    } catch (error) // invalid UUID
    {
      console.error(error);
      return null;
    }
  }

  public async delete(uuid: string): Promise<boolean> {

    try {
      const repo = await getRepository();
      const po = await repo.findOne(uuid);
      if (po.isDeleted) return false;
      po.isDeleted = true;
      repo.save(po)
      return true;
    }
    catch (error) {
      console.error(error);
      throw new Error("not found");
    }
  }

  
}