export interface Employee {
  empId: string; // Ensure this is number if that's the expected type
  empFname: string;
  empLname: string;
  age: number;
  address?: string;
  department?: string;
}
