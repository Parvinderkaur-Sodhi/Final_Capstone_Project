// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({ currentUser, logOut }) => {
//   return (
//     <nav className="navbar navbar-expand navbar-dark bg-dark">
//       <Link to={"/"} className="navbar-brand">
//         HRMS/Job Portal System
//       </Link>
//       <div className="navbar-nav mr-auto">
//         {currentUser && (
//           <li className="nav-item">
//             <Link to={"/user"} className="nav-link">
//               Resource
//             </Link>
//           </li>
//         )}
//       </div>

//       {currentUser ? (
//         <div className="navbar-nav ml-auto">
//           <li className="nav-item">
//             <Link to={"/profile"} className="nav-link">
//               Profile
//             </Link>
//           </li>
//           <li className="nav-item">
//             <a href="/login" className="nav-link" onClick={logOut}>
//               LogOut
//             </a>
//           </li>
//         </div>
//       ) : (
//         <div className="navbar-nav ml-auto">
//           <li className="nav-item">
//             <Link to={"/login"} className="nav-link">
//               Login
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to={"/register"} className="nav-link">
//               Sign Up
//             </Link>
//           </li>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
