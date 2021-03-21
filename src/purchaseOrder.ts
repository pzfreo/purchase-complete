import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PurchaseOrder  {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        length: 256
    })
    poNumber: string;

    @Column("text")
    lineItem: string;

    @Column()
    quantity: number;

    @Column({ type: 'date' })
    date: Date = new Date();

    @Column({
        length: 256
    })
    customerNumber: string;

    @Column({
        length: 256
    })
    paymentReference: string;

    @Column('boolean', {default: false})
    isDeleted: boolean = false;
}

	


export interface Purchase {
    id: number;
    email: string;
    name: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
  }
  