
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { PurchaseOrder } from "./purchaseOrder";
  import { POService, POCreationParams } from "./poService";
  


  @Route("/purchase")
  export class PurchaseController extends Controller {


    @Get("{uuid}")
    public async getUser(@Path() uuid: string,
    ): Promise<PurchaseOrder> {  
      const po : PurchaseOrder = await new POService().get(uuid);
      if (po) return po;
      this.setStatus(404);
      return;
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
      @Body() requestBody: POCreationParams
    ): Promise<PurchaseOrder> {
      console.log(requestBody);
      const po = await (new POService()).create(requestBody);
      this.setStatus(201); // set return status 201
      this.setHeader("Location", "/purchase/" + po.id)
      return po;
    }
  }