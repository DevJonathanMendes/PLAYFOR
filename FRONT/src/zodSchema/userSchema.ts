import { z as zod } from "zod";

export const loginSchema = zod.object({
  username: zod
    .string()
    .nonempty("Username is required")
    .regex(/^[A-Za-z]+$/i, "Only letters are allowed"),
  password: zod.string().nonempty("Password is required"),
});

export const registerSchema = loginSchema
  .extend({
    email: zod.string(),
    confirm_password: zod.string().nonempty("Confirm password is required"),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
  });

export type LoginSchemaData = zod.infer<typeof loginSchema>;
export type RegisterSchemaData = zod.infer<typeof registerSchema>;
