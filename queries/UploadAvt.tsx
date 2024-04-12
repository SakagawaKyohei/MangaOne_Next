import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function UploadAvt(client: TypeSupabaseClient, image: any) {
  const name = uuidv4();
  const { data, error } = await client.storage
    .from("avt")
    .upload("public" + "/" + name + ".jpg", image);
  if (data) {
    const {
      data: { user },
    } = await client.auth.getUser();
    return client.auth.updateUser({
      data: {
        ...user?.user_metadata,

        avt:
          "https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/" +
          name +
          ".jpg",
      },
    });
  } else {
    console.log(error);
  }
}
