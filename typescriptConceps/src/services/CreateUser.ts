interface TechObject {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: string; //? = not required = ' ' 
  email: string;
  //email: string | boolean;
  password: string;
  techs: Array<string | TechObject>;
  //techs: string [] 
}

export default function createUser({ name = '', email, password }: CreateUserData) {
  const user = {
    name, 
    email,
    password
  }

  return user;
}