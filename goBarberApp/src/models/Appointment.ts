import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // we are in the appointments! many appointments can be done by ONE provider
  JoinColumn,
} from 'typeorm'; // Something that will the save in db

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // creating the realtions
  @ManyToOne(() => User) // functions that returns which model should use when this is called
  @JoinColumn({ name: 'provider_id' }) // which column identifies this user?
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
