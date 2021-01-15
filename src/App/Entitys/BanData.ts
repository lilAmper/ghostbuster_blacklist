import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BanData {

    @PrimaryGeneratedColumn()
    banId!: number;

    @Column()
    playerName!: string;

    @Column()
    adminName!: string;

    @Column()
    banReason!: string;

    @Column()
    playerIp!: string;

    @Column()
    playerGPCId!: string;
}