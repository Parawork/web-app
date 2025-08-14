import { Eye, Zap, Target } from "lucide-react";

import { Building, Users, Truck, Wrench, Award, TrendingUp, Shield, Sparkles, Star } from "lucide-react";

const buildingIcon = () => <Building className="w-6 h-6" />;
const awardIcon = () => <Award className="w-6 h-6" />;
const usersIcon = () => <Users className="w-6 h-6" />;
const trendingUpIcon = () => <TrendingUp className="w-6 h-6" />;
const buildingIconLarge = () => <Building className="w-12 h-12 text-cyan-400" />;
const usersIconLarge = () => <Users className="w-12 h-12 text-purple-400" />;
const truckIconLarge = () => <Truck className="w-12 h-12 text-emerald-400" />;
const wrenchIconLarge = () => <Wrench className="w-12 h-12 text-orange-400" />;
const awardIconLarge = () => <Award className="w-8 h-8 text-yellow-400" />;
const shieldIconLarge = () => <Shield className="w-8 h-8 text-emerald-400" />;
const sparklesIconLarge = () => <Sparkles className="w-8 h-8 text-purple-400" />;
const starIconLarge = () => <Star className="w-8 h-8 text-cyan-400" />;


export const constructionStack = [
  {
    name: "Structural Engineering",
    icon: <Eye className="w-6 h-6" />,
    description: "Expert design and analysis of building structures",
  },
  {
    name: "Material Management",
    icon: <Zap className="w-6 h-6" />,
    description: "Selection and handling of construction materials",
  },
  {
    name: "Project Planning",
    icon: <Target className="w-6 h-6" />,
    description: "Comprehensive scheduling and workflow management",
  },
  {
    name: "Sustainable Construction",
    icon: <Shield className="w-6 h-6" />,
    description: "Eco-friendly building methods and materials",
  },
];

export const innovationList = [
  {
    title: "Energy-Efficient Building Design",
    description:
      "Design solutions that reduce energy consumption and operational costs",
    color: "emerald",
  },
  {
    title: "Sustainable Material Usage",
    description:
      "Utilizing renewable and recyclable materials for eco-friendly construction",
    color: "cyan",
  },
  {
    title: "Integrated Infrastructure Planning",
    description:
      "Coordinated development of buildings with surrounding roads, utilities, and public spaces",
    color: "purple",
  },
];

export const stats = [
  {
    number: "200",
    label: "Construction Projects",
    suffix: "+",
    icon: buildingIcon,
    change: "+12%",
  },
  {
    number: "25",
    label: "Years in Innovation",
    suffix: "+",
    icon: awardIcon,
    change: "reliable",
  },
  {
    number: "20",
    label: "Construction Experts",
    suffix: "+",
    icon: usersIcon,
    change: "+8%",
  },
  {
    number: "100",
    label: "Success Rate",
    suffix: "%",
    icon: trendingUpIcon,
    change: "+2%",
  },
];

export const services = [
  {
    icon: buildingIconLarge,
    title: "Commercial Construction Services",
    description:
      "Full-scale commercial building solutions including planning, design, engineering, and high-quality construction work.",
    features: [
      "Complete Project Planning",
      "Energy-Efficient Designs",
      "High-Quality Finishes",
    ],
    metric: "200+ Completed Projects",
    growth: "+12%",
    color: "cyan",
  },
  {
    icon: usersIconLarge,
    title: "Residential Construction Services",
    description:
      "Expert residential construction services delivering custom homes, durable structures, and sustainable living spaces.",
    features: ["Custom Home Design", "Eco-Friendly Materials", "Secure Structures"],
    metric: "50+ Homes Built",
    growth: "+34%",
    color: "purple",
  },
  {
    icon: truckIconLarge,
    title: "Infrastructure Construction Services",
    description:
      "Development of large-scale infrastructure projects including roads, bridges, and public utility facilities.",
    features: ["Road and Highway Construction", "Bridge Building", "Utility Installations"],
    metric: "20+ Infrastructure Projects",
    growth: "+18%",
    color: "emerald",
  },
  {
    icon: wrenchIconLarge,
    title: "Renovation & Retrofitting Services",
    description:
      "Specialized renovation and retrofitting services to restore, upgrade, and modernize existing structures.",
    features: ["Structural Repairs", "Interior Upgrades", "Exterior Refurbishments"],
    metric: "15+ Renovations Completed",
    growth: "+41%",
    color: "orange",
  },
];


export const projects = [
  {
    title: "Colombo Tech Hub 2030 - Detailed Construction",
    category: "Smart Commercial",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    description:
      "Fully detailed construction plan for a 60-story AI-powered smart building with renewable energy systems.",
    tech: ["AI-Driven Detailing", "Solar Integration", "Smart HVAC Layout"],
    status: "In Progress",
    completion: "2026",
    progress: 65,
    investment: "$250M",
    rating: 4.9,
  },
  {
    title: "Kandy Green Residences - Detailed Eco Design",
    category: "Eco-Living",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    description:
      "Carbon-neutral residential project with detailed construction drawings, vertical gardens, and smart home plans.",
    tech: ["Vertical Garden Detailing", "Community Energy Grid Plans", "Smart Home Layouts"],
    status: "Completed",
    completion: "2024",
    progress: 100,
    investment: "$180M",
    rating: 4.8,
  },
  {
    title: "Galle Smart Bridge - Construction Detailing",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    description:
      "IoT-enabled bridge project with detailed structural drawings, adaptive lighting plans, and transportation integration.",
    tech: ["IoT Sensor Placement Plans", "LED Lighting Layout", "Traffic AI Systems"],
    status: "Planning",
    completion: "2027",
    progress: 25,
    investment: "$95M",
    rating: 4.7,
  },
];

export const achievements = [
  {
    title: "Best Detailed Construction Project 2024",
    organization: "Sri Lanka Construction Detail Awards",
    icon: awardIconLarge,
  },
  {
    title: "Sustainability Detail Leader",
    organization: "Green Building Council",
    icon: shieldIconLarge,
  },
  {
    title: "Innovation in Construction Detailing",
    organization: "Tech Construction Forum",
    icon: sparklesIconLarge,
  },
  {
    title: "Top Employer in Detailed Projects 2024",
    organization: "HR Excellence Awards",
    icon: starIconLarge,
  },
];
