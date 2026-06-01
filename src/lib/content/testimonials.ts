export type Testimonial = {
  name: string;
  age: number;
  location: string;
  condition: string;
  track: string;
  quote: string;
  story: string;
  bullets: string[];
  metric: string;
  metricLabel: string;
  metricNumeric?: number;
  metricSuffix?: string;
  metricIsArrow?: boolean;
  image: string;
  imageAlt: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Sharma",
    age: 58,
    location: "Mumbai",
    condition: "Knee Osteoarthritis",
    track: "Manage",
    quote:
      "I was told I needed a knee replacement. Reconnect changed that.",
    story:
      "Rajesh had been living with severe knee osteoarthritis for over five years and was advised surgery. After joining the Manage track, he followed a personalised strength program that focused on quadriceps activation and joint stability. Within 12 weeks his pain score dropped from 8 to 2 and he returned to walking 5 km daily. He has since completed a second cycle and continues to improve.",
    bullets: [
      "Pain dropped from 8 to 2 in 12 weeks",
      "Avoided recommended knee replacement surgery",
      "Back to walking 5 km daily",
    ],
    metric: "8 to 2",
    metricLabel: "Pain score reduction",
    metricNumeric: 2,
    metricSuffix: "/10",
    metricIsArrow: false,
    image: "/testimonial-rajesh.jpg",
    imageAlt: "Rajesh Sharma, 58, Reconnect member from Mumbai",
  },
  {
    name: "Meera Raghavan",
    age: 42,
    location: "Bengaluru",
    condition: "Chronic Back Pain",
    track: "Manage",
    quote:
      "I spent years avoiding movement. Reconnect helped me build strength around the problem.",
    story:
      "Meera had a diagnosed L4-L5 disc bulge and chronic lower back pain that kept her from exercising for three years. Her program focused on core stability, posterior chain strengthening, and gradual loading. After completing the 12-week Manage track, her medication was reduced by 80 percent and she has not had a flare-up in over four months. She now trains three times a week independently.",
    bullets: [
      "Medication reduced by 80% under doctor supervision",
      "No flare-up in over 4 months",
      "Now trains independently 3× a week",
    ],
    metric: "80%",
    metricLabel: "Medication reduced",
    metricNumeric: 80,
    metricSuffix: "%",
    metricIsArrow: false,
    image: "/testimonial-meera.jpg",
    imageAlt: "Meera Raghavan, 42, Reconnect member from Bengaluru",
  },
  {
    name: "Amit Kapoor",
    age: 65,
    location: "Delhi",
    condition: "Osteoporosis",
    track: "Recover",
    quote:
      "My DEXA scan improved for the first time in years. The difference was visible.",
    story:
      "Amit was diagnosed with osteoporosis after a wrist fracture and had a T-score of -3.2. His program combined load-bearing exercises with anti-inflammatory nutrition guidance and vitamin D optimisation. After 12 weeks his follow-up DEXA showed measurable improvement in lumbar spine density. His balance and confidence have also improved significantly, reducing his fall risk.",
    bullets: [
      "First DEXA improvement in years — lumbar density gained",
      "Balance and fall-risk significantly improved",
      "Nutrition + strength combined under one plan",
    ],
    metric: "T-score ↑",
    metricLabel: "Bone density gain",
    metricNumeric: undefined,
    metricIsArrow: true,
    image: "/testimonial-amit.jpg",
    imageAlt: "Amit Kapoor, 65, Reconnect member from Delhi",
  },
];
