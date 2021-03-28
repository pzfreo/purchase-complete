
import {
    Body,
    Controller,
    Get,
    Put,
    Path,
    Post,
    Route,
    SuccessResponse,
    Delete,
  } from "tsoa";
  import { PurchaseOrder } from "./purchaseOrder";
  import { POService, POCreationParams } from "./poService";
  
  interface ErrorReport {
    error: string;
  }

  @Route("/purchase")
  export class PurchaseController extends Controller {


    /**
     * Get a PO based on the uuid
     * @param uuid This is generated when you create the PO
     * @returns PO or error
     */
    @Get("{uuid}")
    public async getPurchase(@Path() uuid: string
    ): Promise<PurchaseOrder | ErrorReport> {  
      
      const po : PurchaseOrder = await new POService().getOne(uuid);
      if (po) return po;
      this.setStatus(404);
      return { error: "Not Found"};
    }

    /**
     * Get all POs in the system
     * @returns an array of hrefs 
     */
    @Get()
    public async getAllPurchases() : Promise<any> {
      const pos : PurchaseOrder[] = await new POService().getAll();
      return pos.filter(function (po:PurchaseOrder) {return !po.isDeleted}).map( function (po:PurchaseOrder)  { return {"href": po.id}});
    
    }
    
    /**
     * Create a PO
     * @param requestBody 
     * @returns 
     */
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createPurchase(
      @Body() requestBody: POCreationParams
    ): Promise<PurchaseOrder> {
      
      const po = await (new POService()).create(requestBody);
      this.setStatus(201); // set return status 201
      this.setHeader("Location", "/purchase/" + po.id)
      return po;
    }

    /**
     * Delete a PO
     * @param uuid an existing UUID for a PO 
     * @returns empty response
     */
    @SuccessResponse("200", "OK")
    @Delete("{uuid}")
    public async delete(@Path() uuid: string) : Promise<null> {  
      try {
        const success:boolean = await new POService().delete(uuid);
        if (success) {
          this.setStatus(200);
          return ;
        }
        else { // already deleted
          this.setStatus(410);
          return ;
        }
      }
      catch (error) { // not found
        this.setStatus(404);
        return;
      }
    }


    /**
     * 
     * @param uuid Update a PO
     * @param requestBody the updated data
     * @returns The latest view of the PO
     */
    @Put("{uuid}")
    public async updatePO(
        @Path() uuid: string,
        @Body() requestBody: POCreationParams
    ): Promise<PurchaseOrder|ErrorReport> {  
      
      try {
        const po : PurchaseOrder = await new POService().update(uuid, requestBody);
        if (po) {
          this.setStatus(200);
          return po; // success
        } 
        else { // failed to find uuid
          this.setStatus(404);
          return { error: "not found"};
        }
      } catch (error) {   // wrong format
        this.setStatus(400);
        return { error: "invalid JSON"};
      }
    }

  }