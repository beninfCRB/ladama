import { z } from "zod";

const loginSchema = z.object({
  email_pic: z
    .string()
    .email("Email harus berupa alamat email yang valid.")
    .min(1, "Email tidak boleh kosong."),
  password: z.string().min(1, "Password tidak boleh kosong."),
});

export { loginSchema };
