import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

interface Manga {
  ten: string;
  tenkhac: string;
  theloai: string[];
  detail: string;
  tacgia: string;
  biatruyen: any;
}
export async function CreateMangaQuery(
  client: TypeSupabaseClient,
  {
    manga,
  }: {
    manga: Manga;
  },
  uid: any,
  id: any
) {
  const currentDateTime = new Date(); // Lấy thời gian hiện tại
  const timestampzString = currentDateTime.toISOString();
  if (id == "") {
    id = uuidv4();
  }
  if (manga.biatruyen == null) {
    return client.from("manga").upsert({
      id: id,
      created_at: timestampzString,
      name: manga.ten,
      other_name: manga.tenkhac,
      genre: manga.theloai,
      view: 0,
      author: manga.tacgia,
      detail: manga.detail,
      nguoi_dang: uid,
    });
  } else {
    const id_anhbia = uuidv4();

    const { data: data1, error } = await client.storage
      .from("avt")
      .upload("public" + "/" + id_anhbia + ".jpg", manga.biatruyen);
    //update avt in db
    if (data1) {
    } else {
      console.log(error);
    }
    return client.from("manga").upsert({
      id: id,
      created_at: timestampzString,
      name: manga.ten,
      other_name: manga.tenkhac,
      genre: manga.theloai,
      view: 0,
      author: manga.tacgia,
      detail: manga.detail,
      biatruyen:
        "https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/" +
        id_anhbia +
        ".jpg",
      nguoi_dang: uid,
    });
  }
}
