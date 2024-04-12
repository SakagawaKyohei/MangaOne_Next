import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";
import { UpdateUserMetadataQuery } from "@/queries/UpdateUserMetadataQuery";
import useSupabase from "./useSupabase";
import { UploadAvt } from "@/queries/UploadAvt";
interface User {
  avt: string;
  ten: string;
  ho: string;
  sdt: string;
  stk: string;
  coin: number;
}

function useUploadAvt(img: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await UploadAvt(client, img);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useUploadAvt;
