import { TypeSupabaseClient } from "@/utils/supabase";

interface User {
  email: string;
  username: string;
  password: string;
}

export async function CreateUser(
  client: TypeSupabaseClient,
  {
    user,
  }: {
    user: User;
  }
) {
  try {
    const signUpResponse = await client.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          ten: user.username,
          ho: "",
          avt: "https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/Chualogin.svg",
          stk: "",
          sdt: "",
          coin: 0,
        },
      },
    });

    // Kiểm tra xem signUpResponse có tồn tại không và có thuộc tính 'user' trong dữ liệu trả về không

    // Kiểm tra nếu người dùng đã tồn tại trong hệ thống
    console.log(signUpResponse.data);
    if (
      signUpResponse.data.user &&
      signUpResponse.data.user.identities &&
      signUpResponse.data.user.identities.length === 0
    ) {
      throw new Error("Email đã được đăng ký");
    }

    // Nếu signUpResponse chứa lỗi, ném nó để xử lý ở khối catch
    if (signUpResponse.error) {
      throw signUpResponse.error;
    }

    // Thực hiện các thao tác sau khi đăng ký thành công nếu cần thiết
    // Ví dụ: đăng ký người dùng vào hệ thống của bạn
    // handleUserRegistration(signUpResponse.user);

    return signUpResponse;
  } catch (error) {
    // Xử lý lỗi ở đây
    console.error("Error signing up:", error);
    throw error; // Re-throw để cho phép caller của hàm xử lý lỗi
  }
}
