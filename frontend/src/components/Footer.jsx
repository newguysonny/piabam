import { FiFacebook, FiInstagram, FiTwitter, FiMusic, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaRegCopyright, FaTiktok } from 'react-icons/fa';


const Footer = () => {
  // Social button component
  const SocialButton = ({ platform }) => {
    const icons = {
      facebook: <FiFacebook className="text-white" />,
      instagram: <FiInstagram className="text-white" />,
      twitter: <FiTwitter className="text-white" />,
      tiktok: <FaTiktok className="text-white" />,
    };

    const bgColors = {
      facebook: 'bg-[#1877F2]',
      instagram: 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      twitter: 'bg-[#1DA1F2]',
      tiktok: 'bg-black',
    };

    return (
      <a 
        href="#" 
        className={`w-8 h-8 rounded-full ${bgColors[platform]} hover:scale-105 transition-transform flex items-center justify-center`}
        aria-label={`${platform} link`}
      >
        {icons[platform]}
      </a>
    );
  };

  // Company info component
  const CompanyInfo = ({ name }) => (
    <div className="mt-4 text-gray-400 text-sm space-y-1">
      {name === 'PIABAM' && (
        <>
          <p>PIABAM LTD. | CEO Daejun Park</p>
          <p>Business Registration: 120-88-00767</p>
          <p>Mail order sales: 2017-Seoul Songpa-0680</p>
          <div className="flex items-start mt-2">
            <FiMapPin className="mr-2 mt-1 flex-shrink-0" />
            <p>570 Songpa-daero, Songpa-gu, Seoul</p>
          </div>
          <div className="flex items-center">
            <FiMail className="mr-2" />
            <p>info@piabam.com</p>
          </div>
          <div className="flex items-center">
            <FiPhone className="mr-2" />
            <p>Customer Center: 1670-9827</p>
          </div>
        </>
      )}
      {name === 'LEM' && (
        <>
          <p>LEM CORPORATION</p>
          <p>Business Registration: 123-45-67890</p>
          <p>Seoul, South Korea</p>
        </>
      )}
      {name === 'FAAJEE' && (
        <>
          <p>FAAJEE ENTERPRISES</p>
          <p>Business Registration: 987-65-43210</p>
          <p>Seoul, South Korea</p>
        </>
      )}
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* PIABAM Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">PIABAM</h3>
            <div className="flex gap-3">
              <SocialButton platform="facebook" />
              <SocialButton platform="instagram" />
              <SocialButton platform="twitter" />
              <SocialButton platform="tiktok" />
            </div>
            <CompanyInfo name="PIABAM" />
          </div>

          {/* LEM Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">LEM</h3>
            <div className="flex gap-3">
              <SocialButton platform="facebook" />
              <SocialButton platform="instagram" />
              <SocialButton platform="twitter" />
              <SocialButton platform="tiktok" />
            </div>
            <CompanyInfo name="LEM" />
          </div>

          {/* FAAJEE Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">FAAJEE</h3>
            <div className="flex gap-3">
              <SocialButton platform="facebook" />
              <SocialButton platform="instagram" />
              <SocialButton platform="twitter" />
              <SocialButton platform="tiktok" />
            </div>
            <CompanyInfo name="FAAJEE" />
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <a href="#" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="hover:text-purple-400 transition-colors">FAQ</a>
              <a href="#" className="hover:text-purple-400 transition-colors">About Us</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contacts</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            </div>
          </div>
        </div>

        {/* Work With Us Section */}
       
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-center mb-4">Work With Us</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-sm">
            <a href="#" className="text-center hover:text-purple-400 transition-colors">Business/Partnership</a>
            <a href="#" className="text-center hover:text-purple-400 transition-colors">Advertise/Marketing</a>
            <a href="#" className="text-center hover:text-purple-400 transition-colors">Add Your Restaurant</a>
            <a href="#" className="text-center hover:text-purple-400 transition-colors">Sign Up to Deliver</a>
          </div>
        </div>

           
 
        {/* Copyright */}
        <div className="mt-16 pt-6 border-t border-gray-800 flex items-center justify-center text-gray-400 text-sm">
          <FaRegCopyright className="mr-2" />
          <span>2024 PIABAM. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
