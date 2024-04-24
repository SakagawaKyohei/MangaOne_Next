import { TypeSupabaseClient } from "@/utils/supabase";

export async function SendMail(client: TypeSupabaseClient, mail: string) {
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  return client.auth.resetPasswordForEmail(mail, {
    redirectTo: "http://localhost:3000/reset-password",
  });
}
