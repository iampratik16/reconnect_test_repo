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
    condition: "Rheumatoid Arthritis",
    track: "Strengthen",
    quote:
      "With my medication and the right exercise together, my arthritis is the best it’s been in years.",
    story:
      "Rajesh lives with rheumatoid arthritis, an autoimmune condition that left his joints painful, swollen and stiff. Working closely with his rheumatologist, his Reconnect program paired his prescribed medication with carefully graded, joint-supportive strength work — never moving to the next stage without his doctor’s sign-off. Over 16 weeks his pain and morning stiffness eased considerably, his grip and mobility improved, and he is far more active and confident in everyday life.",
    bullets: [
      "Prescribed medication paired with doctor-guided strength work",
      "Pain and morning stiffness eased over 16 weeks",
      "More active and confident in daily life",
    ],
    metric: "Stiffness ↓",
    metricLabel: "Pain and stiffness eased",
    metricNumeric: undefined,
    metricIsArrow: true,
    image: "/old_man3.jpg",
    imageAlt: "Rajesh Sharma, 58, Reconnect member from Mumbai",
  },
  {
    name: "Meera Raghavan",
    age: 42,
    location: "Bengaluru",
    condition: "Knee Osteoarthritis",
    track: "Manage",
    quote:
      "At 42, I was told I needed surgery. I avoided it — and got my strength back.",
    story:
      "Meera was 42 when she was advised surgery for severe knee osteoarthritis. Determined to try every alternative first, she joined the Manage track and followed a personalised strength program built around quadriceps activation, joint stability and gradual loading. Within 16 weeks her pain had dropped sharply, she had cancelled the operation, and she was climbing stairs and walking without the support she had come to rely on. She now trains three times a week independently.",
    bullets: [
      "Advised surgery at 42 — avoided it",
      "Pain dropped sharply over 16 weeks",
      "Back to stairs and walking unaided",
    ],
    metric: "No surgery",
    metricLabel: "Operation avoided",
    metricNumeric: undefined,
    metricIsArrow: false,
    image: "/fff.png",
    imageAlt: "Meera Raghavan, 42, Reconnect member from Bengaluru",
  },
  {
    name: "Amit Kapoor",
    age: 65,
    location: "Delhi",
    condition: "Cervical Spondylosis",
    track: "Prevent",
    quote:
      "Years of spondylosis stiffness — and a structured exercise plan finally eased it.",
    story:
      "Amit had been diagnosed with cervical and lumbar spondylosis and had grown used to daily stiffness and a limited range of motion. Rather than wait for it to worsen, he began a doctor-designed exercise routine focused on mobility, posture correction and gradual strengthening. Over 16 weeks his stiffness reduced noticeably, his range of motion improved, and the everyday aches that once shaped his day have largely settled — keeping him ahead of further wear.",
    bullets: [
      "Daily neck and back stiffness noticeably reduced",
      "Range of motion and posture improved over 16 weeks",
      "Staying ahead of further spinal wear",
    ],
    metric: "Mobility ↑",
    metricLabel: "Range of motion regained",
    metricNumeric: undefined,
    metricIsArrow: true,
    image: "/old_man2.jpg",
    imageAlt: "Amit Kapoor, 65, Reconnect member from Delhi",
  },
];
