// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       {/* Background decorative elements */}
//       <div className="footer-bg-elements">
//         <div className="footer-circle footer-circle-1"></div>
//         <div className="footer-circle footer-circle-2"></div>
//         <div className="footer-glow"></div>
        
//         {/* Decorative dots patterns */}
//         <svg className="footer-dots footer-dots-left" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
//           {[0, 1, 2].map(row => (
//             [0, 1, 2].map(col => (
//               <circle 
//                 key={`${row}-${col}`} 
//                 cx={10 + col * 20} 
//                 cy={10 + row * 20} 
//                 r="2" 
//                 fill="#8ab4f8" 
//               />
//             ))
//           ))}
//         </svg>
        
//         <svg className="footer-dots footer-dots-right" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
//           {[0, 1, 2].map(row => (
//             [0, 1, 2].map(col => (
//               <circle 
//                 key={`${row}-${col}`} 
//                 cx={10 + col * 20} 
//                 cy={10 + row * 20} 
//                 r="2" 
//                 fill="#8ab4f8" 
//               />
//             ))
//           ))}
//         </svg>
//       </div>
      
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-links">
//           <li><a href="/">Home</a></li>
//               <li><a href="/clubs">Clubs</a></li>
//               <li><a href="/pastevents">Gallery</a></li>
//               <li><a href="/contact">Contact</a></li>
//               <li><a href="/developers">Developers</a></li>
//           </div>
          
//           {/* Social icons */}
//           <div className="social-icons">
//             <a href="#" className="social-icon" aria-label="Twitter">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 4s-.7 2.1-2 3.4c.3 4.6-5.1 10.8-13 11.6-4 .5-7-1 7-3.5-5.5 0-9.5-1.5-11-5 1 0 2 .5 3 0C2 9 .5 5.5 2.5 3c1 1.5 3 2.5 5 2.5C4 4 7 .5 11 2c4 1.5 6 3.5 9 3 1-.5 2-1.5 2-1z"></path>
//               </svg>
//             </a>
//             <a href="#" className="social-icon" aria-label="Instagram">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//               </svg>
//             </a>
//             <a href="#" className="social-icon" aria-label="Facebook">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//               </svg>
//             </a>
//             <a href="#" className="social-icon" aria-label="LinkedIn">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//                 <rect x="2" y="9" width="4" height="12"></rect>
//                 <circle cx="4" cy="4" r="2"></circle>
//               </svg>
//             </a>
//           </div>
          
//           <p className="copyright">© 2025 Clubs Management Portal | Developed by NRHK❤️</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';
import './Footer.css';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Background decorative elements */}
      <div className="footer-bg-elements">
        <div className="footer-circle footer-circle-1"></div>
        <div className="footer-circle footer-circle-2"></div>
        <div className="footer-glow"></div>
        
      </div>
      
      <div className="container">
        <div className="footer-content">
          <nav className="footer-nav">
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/clubs">Clubs</a></li>
              <li><a href="/pastevents">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/developers">Developers</a></li>
            </ul>
          </nav>
          
          {/* Social icons */}
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
          </div>
          
          <p className="copyright">© 2025 Clubs Management Portal | Developed by NRHK❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;