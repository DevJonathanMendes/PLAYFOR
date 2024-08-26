import { z as zod } from "zod";

export const loginSchema = zod.object({
  username: zod.string().min(1, "Username is required"),
  password: zod.string().min(1, "Password is required"),
});

export const registerSchema = loginSchema
  .extend({
    email: zod.string().email("Email is required"),
    confirm_password: zod.string().min(1, "Confirm password is required"),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
  });

export type LoginSchemaData = zod.infer<typeof loginSchema>;
export type RegisterSchemaData = zod.infer<typeof registerSchema>;
