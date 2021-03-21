"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
class POService {
    async getOne(uuid) {
        try {
            const repo = await db_1.getRepository();
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
    async getAll() {
        const repo = await db_1.getRepository();
        const pos = await repo.find();
        return pos;
    }
    async create(poCreationParams) {
        try {
            const repo = await db_1.getRepository();
            const po = await repo.create(poCreationParams);
            const results = await repo.save(po);
            return po;
        }
        catch (error) {
            console.error(error);
            throw new Error("invalid input");
        }
    }
    async update(uuid, updatedOrder) {
        const repo = await db_1.getRepository();
        try {
            console.log(uuid);
            const po = await repo.findOne(uuid);
            console.log(uuid, po);
            if (!po)
                return null; // not found return null
            try {
                repo.merge(po, updatedOrder);
                const results = await repo.save(po);
                return po;
            }
            catch (error) // problem merging
             {
                console.error(error);
                throw new Error("invalid input");
            }
        }
        catch (error) // invalid UUID
         {
            console.error(error);
            return null;
        }
    }
    async delete(uuid) {
        try {
            const repo = await db_1.getRepository();
            const po = await repo.findOne(uuid);
            if (po.isDeleted)
                return false;
            po.isDeleted = true;
            repo.save(po);
            return true;
        }
        catch (error) {
            console.error(error);
            throw new Error("not found");
        }
    }
}
exports.POService = POService;
