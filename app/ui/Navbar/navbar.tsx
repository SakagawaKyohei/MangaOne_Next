// import React, { useState } from "react";
// //import { useLocation, useParams } from "react-router-dom";
// import Navbar1 from "./navbar1";
// import Navbar2 from "./navbar2";

// function Navbar() {
//   const [p, setPath] = useState("");
//   //const loca = useLocation();
//   // React.useEffect(() => {
//   //   // Google Analytics
//   //   setPath(window.location.pathname);
//   // }, [loca]);

//   function renderSwitch(path: string) {
//     if (path.match(/^\/noi-dung\/(.*)$/)) {
//       // Nếu đường dẫn bắt đầu bằng "/noi-dung/", return Navbar2
//       return <Navbar2 />;
//     } else {
//       // Xử lý các trường hợp khác
//       switch (path) {
//         case "/dang-nhap":
//         case "/dang-ky":
//         case "/quen-mat-khau":
//         case "/reset-password":
//           return <></>;
//         default:
//           return <Navbar1 />;
//       }
//     }
//   }
//   return <>{renderSwitch(p)}</>;
// }

// export default Navbar;
// function renderSwitch(param: any) {
//   throw new Error("Function not implemented.");
// }
