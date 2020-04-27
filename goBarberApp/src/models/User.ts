import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, // the table when user created its profile
  UpdateDateColumn, // and also when it has updated it
} from 'typeorm'; // Something that will the save in db

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
