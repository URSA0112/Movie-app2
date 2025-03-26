import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();

  const defaultPage = () => {
    router.push('/');
  };

  return (
    <footer className="w-full bg-blue-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-10 mt-10 transition-all min-h-[150px] h-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        
        {/* logo & tagline */}
        <div >
          <img
            src="/movie-logo.png"
            alt="movie-logo"
            className="w-24 max-w-[120px] h-auto cursor-pointer mb-5"
            onClick={defaultPage}
          />
          <p className="text-sm">Your favorite movies, anytime, anywhere.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Upcoming</a></li>
            <li><a href="#" className="hover:underline">Top Rated</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@movieworld.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 234 567 890</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Los Angeles, CA</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
          <div className="flex gap-4 text-gray-700 dark:text-gray-300">
            <a href="#"><Facebook className="w-6 h-6 hover:text-blue-600 transition" /></a>
            <a href="#"><Twitter className="w-6 h-6 hover:text-blue-400 transition" /></a>
            <a href="#"><Instagram className="w-6 h-6 hover:text-pink-500 transition" /></a>
            <a href="#"><Youtube className="w-6 h-6 hover:text-red-500 transition" /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-400/30 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MovieWorld. All rights reserved.
      </div>
    </footer>
  );
}