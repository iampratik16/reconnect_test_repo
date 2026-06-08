export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Programs", href: "/approach" },
  { label: "Prevent", href: "/programs/prevent" },
  { label: "How It Works", href: "/approach#the-journey" },
  { label: "Reconnect Team", href: "/reconnect-team" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/contact#faq" },
];

export const ctaLink: NavLink = {
  label: "Take the free assessment",
  href: "/assessment",
};
