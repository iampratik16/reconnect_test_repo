export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Programs", href: "/programs" },
  { label: "Prevent", href: "/programs/prevent" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Dr. Shruthi", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export const ctaLink: NavLink = {
  label: "Take the free assessment",
  href: "/assessment",
};
