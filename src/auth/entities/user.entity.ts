

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name:'Users' })
export class user {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'varchar', length: 150 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
     password: string;

}


