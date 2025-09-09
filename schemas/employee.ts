import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  email: z.string().email("Email không hợp lệ"),
  city: z.string().min(1, "Chọn thành phố"),
  district: z.string().min(1, "Chọn quận/huyện"),
  phone: z.string().regex(/^[0-9]{9,12}$/, "SĐT phải là 9-12 chữ số"),
  image: z.any().optional(),
});

// ✅ type từ schema
export type EmployeeFormData = z.infer<typeof employeeSchema>;