import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * A Purchase Order object lets you interact with the PO
 */
@Entity()
export class PurchaseOrder  {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    /**
     * The poNumber is your number for the PO
     */

    @Column({
        length: 256
    })
    poNumber: string;

    /**
     * The lineItem must match our catalogue
     */
    @Column("text")
    lineItem: string;

    @Column()
    quantity: number;

    @Column({ type: 'date' })
    date: Date = new Date();

    /**
     * This is the customer number you were issued when registering with the system
     */
    @Column({
        length: 256
    })
    customerNumber: string;

    /** 
     * The payment reference from the payment system
     */

    @Column({
        length: 256
    })
    paymentReference: string;

    /**
     * We use this to track if your PO has been cancelled
     */
    @Column('boolean', {default: false})
    isDeleted = false;
}

	
