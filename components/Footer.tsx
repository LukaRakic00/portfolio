'use client'

import Link from 'next/link'

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
  { name: 'GitHub', href: 'https://github.com', icon: '💻' },
  { name: 'ResearchGate', href: 'https://researchgate.net', icon: '🔬' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-black text-gradient mb-4">Portfolio</h3>
            <p className="text-slate-400 leading-relaxed">
              Creating modern digital experiences with passion and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Social</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 hover:scale-110 hover:border-white/20 transition-all duration-300"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
