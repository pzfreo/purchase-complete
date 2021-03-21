"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const poService_1 = require("./poService");
let PurchaseController = class PurchaseController extends tsoa_1.Controller {
    async getPurchase(uuid) {
        console.log("get");
        const po = await new poService_1.POService().getOne(uuid);
        if (po)
            return po;
        this.setStatus(404);
        return;
    }
    async getAllPurchases() {
        const pos = await new poService_1.POService().getAll();
        return pos.filter(function (po) { return !po.isDeleted; }).map(function (po) { return { "href": po.id }; });
        // return  pos;
    }
    async createUser(requestBody) {
        console.log(requestBody);
        const po = await (new poService_1.POService()).create(requestBody);
        this.setStatus(201); // set return status 201
        this.setHeader("Location", "/purchase/" + po.id);
        return po;
    }
    async delete(uuid) {
        try {
            const success = await new poService_1.POService().delete(uuid);
            if (success) {
                this.setStatus(200);
                return;
            }
            else { // already deleted
                this.setStatus(410);
                return;
            }
        }
        catch (error) { // not found
            this.setStatus(404);
            return;
        }
    }
    async updatePO(uuid, requestBody) {
        console.log("PUT");
        console.log(uuid);
        console.log(requestBody);
        // try {
        const po = await new poService_1.POService().update(uuid, requestBody);
        if (po) {
            this.setStatus(200);
            return po; // success
        }
        // failed to find uuid
        this.setStatus(404);
        return;
        // }
        // catch (error) {
        //   // wrong format
        //   this.setStatus(400);
        //   return;
        // }
    }
};
__decorate([
    tsoa_1.Get("{uuid}"),
    __param(0, tsoa_1.Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getPurchase", null);
__decorate([
    tsoa_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getAllPurchases", null);
__decorate([
    tsoa_1.SuccessResponse("201", "Created") // Custom success response
    ,
    tsoa_1.Post(),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "createUser", null);
__decorate([
    tsoa_1.Delete("{uuid}"),
    __param(0, tsoa_1.Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "delete", null);
__decorate([
    tsoa_1.Put("{uuid}"),
    __param(0, tsoa_1.Path()),
    __param(1, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "updatePO", null);
PurchaseController = __decorate([
    tsoa_1.Route("/purchase")
], PurchaseController);
exports.PurchaseController = PurchaseController;
