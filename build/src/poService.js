"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Repository } from "typeorm";
const db_1 = require("./db");
class POService {
    async get(uuid) {
        try {
            const repo = await db_1.getRepository();
            const po = await repo.findOne(uuid);
            if (po)
                return po;
            else
                throw new Error("cannot find uuid" + uuid);
        }
        catch (error) {
            throw new Error("cannot find uuid" + uuid);
        }
    }
    async create(poCreationParams) {
        try {
            const repo = await db_1.getRepository();
            const po = await repo.create(poCreationParams);
            const results = await repo.save(po);
            return po;
        }
        catch (error) {
            throw new Error("invalid input");
        }
    }
}
exports.POService = POService;
