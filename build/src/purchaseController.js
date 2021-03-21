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
    async getUser(uuid) {
        return new poService_1.POService().get(uuid);
    }
    async createUser(requestBody) {
        this.setStatus(201); // set return status 201
        const po = (new poService_1.POService()).create(requestBody);
        return po;
    }
};
__decorate([
    tsoa_1.Get("{uuid}"),
    __param(0, tsoa_1.Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getUser", null);
__decorate([
    tsoa_1.SuccessResponse("201", "Created") // Custom success response
    ,
    tsoa_1.Post(),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "createUser", null);
PurchaseController = __decorate([
    tsoa_1.Route("/purchase")
], PurchaseController);
exports.PurchaseController = PurchaseController;
