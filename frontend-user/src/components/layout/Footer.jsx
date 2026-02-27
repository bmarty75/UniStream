const footerLinks = {
  "A propos": ["Qui sommes-nous", "Emplois", "Presse"],
  "Aide": ["FAQ", "Centre d'aide", "Compte", "Contact"],
  "Légal": ["Confidentialité", "Conditions d'utilisation", "Mentions légales"],
  "Réseaux": ["Facebook", "Twitter", "Instagram", "YouTube"]
};

const socialIcons = [
  { name: "Facebook", logo: "f" },
  { name: "Twitter", logo: "t" },
  { name: "Instagram", logo: "i" },
  { name: "YouTube", logo: "y" }
];

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold mb-4 text-gray-300">
                {category}
              </h3>
              
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          {socialIcons.map(({ name, logo }) => (
            <a key={name} href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors" aria-label={name}>
              <span className="text-xl">{logo}</span>
            </a>
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 Netflix Clone - Projet pédagogique IUT Informatique - Limoges</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;