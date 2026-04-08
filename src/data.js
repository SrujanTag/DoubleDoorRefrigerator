export const productsData = [
  // SSDs
  { id: 101, title: 'Samsung 990 Pro', subtitle: 'Leading PCIe 4.0 NVMe', category: 'SSD', isNew: true, features: { Capacity: '2TB', Speed: '7450 MB/s' } },
  { id: 102, title: 'WD Black SN850X', subtitle: 'High performance gaming SSD', category: 'SSD', isNew: false, features: { Capacity: '2TB', Speed: '7300 MB/s' } },
  { id: 103, title: 'Crucial T700', subtitle: 'Next-gen PCIe 5.0 speed', category: 'SSD', isNew: true, features: { Capacity: '2TB', Speed: '12400 MB/s' } },
  { id: 104, title: 'Kingston KC3000', subtitle: 'Reliable high-speed storage', category: 'SSD', isNew: false, features: { Capacity: '1TB', Speed: '7000 MB/s' } },
  { id: 105, title: 'Sabrent Rocket 4 Plus', subtitle: 'Enthusiast level performance', category: 'SSD', isNew: false, features: { Capacity: '4TB', Speed: '7100 MB/s' } },
  { id: 106, title: 'TeamGroup MP34', subtitle: 'Affordable NVMe option', category: 'SSD', isNew: false, features: { Capacity: '1TB', Speed: '3400 MB/s' } },
  { id: 107, title: 'Crucial MX500', subtitle: 'Classic SATA SSD', category: 'SSD', isNew: false, features: { Capacity: '1TB', Speed: '560 MB/s' } },
  { id: 108, title: 'Corsair MP600 Pro', subtitle: 'Heatsink equipped NVMe', category: 'SSD', isNew: false, features: { Capacity: '2TB', Speed: '7100 MB/s' } },

  // Graphics Cards
  { id: 201, title: 'NVIDIA RTX 4090', subtitle: 'The ultimate GPU', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '24GB GDDR6X', Power: '450W' } },
  { id: 202, title: 'AMD Radeon RX 7900 XTX', subtitle: 'Flagship AMD performance', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '24GB GDDR6', Power: '355W' } },
  { id: 203, title: 'NVIDIA RTX 4080 Super', subtitle: 'High-end 4K gaming', category: 'GRAPHICS CARDS', isNew: true, features: { VRAM: '16GB GDDR6X', Power: '320W' } },
  { id: 204, title: 'AMD Radeon RX 7800 XT', subtitle: '1440p sweet spot', category: 'GRAPHICS CARDS', isNew: true, features: { VRAM: '16GB GDDR6', Power: '263W' } },
  { id: 205, title: 'NVIDIA RTX 4070 Ti Super', subtitle: 'Premium 1440p / Entry 4K', category: 'GRAPHICS CARDS', isNew: true, features: { VRAM: '16GB GDDR6X', Power: '285W' } },
  { id: 206, title: 'AMD Radeon RX 7600', subtitle: 'Budget 1080p gaming', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '8GB GDDR6', Power: '165W' } },
  { id: 207, title: 'NVIDIA RTX 3060', subtitle: 'Most popular mainstream GPU', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '12GB GDDR6', Power: '170W' } },
  { id: 208, title: 'Intel Arc A770', subtitle: 'Intel\'s flagship entry', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '16GB GDDR6', Power: '225W' } },

  // CPUs
  { id: 301, title: 'AMD Ryzen 7 7800X3D', subtitle: 'Best gaming CPU', category: 'CPUs', isNew: false, features: { Cores: '8C/16T', Boost: '5.0 GHz' } },
  { id: 302, title: 'Intel Core i9-14900K', subtitle: 'Ultimate hybrid performance', category: 'CPUs', isNew: true, features: { Cores: '24C/32T', Boost: '6.0 GHz' } },
  { id: 303, title: 'AMD Ryzen 9 7950X', subtitle: 'Top tier productivity', category: 'CPUs', isNew: false, features: { Cores: '16C/32T', Boost: '5.7 GHz' } },
  { id: 304, title: 'Intel Core i5-13600K', subtitle: 'Value and performance', category: 'CPUs', isNew: false, features: { Cores: '14C/20T', Boost: '5.1 GHz' } },
  { id: 305, title: 'AMD Ryzen 5 7600X', subtitle: 'Great entry to AM5', category: 'CPUs', isNew: false, features: { Cores: '6C/12T', Boost: '5.3 GHz' } },
  { id: 306, title: 'Intel Core i7-14700K', subtitle: 'High-end all rounder', category: 'CPUs', isNew: true, features: { Cores: '20C/28T', Boost: '5.6 GHz' } },
  { id: 307, title: 'AMD Ryzen 5 5600X', subtitle: 'Budget AM4 king', category: 'CPUs', isNew: false, features: { Cores: '6C/12T', Boost: '4.6 GHz' } },

  // Tools
  { id: 401, title: 'CrystalDiskMark', subtitle: 'Storage benchmark utility', category: 'TOOLS', isNew: false, features: { Type: 'Benchmarking', License: 'Open Source' } },
  { id: 402, title: 'WizTree', subtitle: 'Extremely fast disk space analyzer', category: 'TOOLS', isNew: false, features: { Type: 'Analytics', Speed: 'MFT based' } },
  { id: 403, title: 'Samsung Magician', subtitle: 'SSD management software', category: 'TOOLS', isNew: false, features: { Ecosystem: 'Samsung', Type: 'Optimization' } },
  { id: 404, title: 'Apple Intelligence', subtitle: 'Advanced AI features for Apple ecosystem', category: 'TOOLS', isNew: true, features: { Ecosystem: 'Apple', Type: 'Generative AI' } },
  { id: 405, title: 'Galaxy AI', subtitle: "Samsung's integrated mobile AI", category: 'TOOLS', isNew: true, features: { Ecosystem: 'Android/Samsung', Type: 'Generative AI' } },
  { id: 406, title: 'HWMonitor', subtitle: 'Hardware sensor monitoring tool', category: 'TOOLS', isNew: false, features: { Type: 'Diagnostics', Sensors: 'Temps, Voltages, Fans' } },
  { id: 407, title: 'Cinebench R24', subtitle: 'CPU/GPU rendering benchmark', category: 'TOOLS', isNew: false, features: { Engine: 'Redshift', Focus: 'Stress Testing' } },
  { id: 408, title: 'Rufus', subtitle: 'Create bootable USB drives', category: 'TOOLS', isNew: false, features: { Type: 'System Utility', SupportedOS: 'Windows/Linux' } },

  // Memory (RAM)
  { id: 501, title: 'Corsair Vengeance RGB DDR5', subtitle: 'Popular RGB DDR5', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '6000MT/s' } },
  { id: 502, title: 'G.Skill Trident Z5 RGB NEO', subtitle: 'Optimized for AMD EXPO', category: 'MEMORY (RAM)', isNew: true, features: { Capacity: '32GB (2x16GB)', Speed: '6000MT/s' } },
  { id: 503, title: 'Kingston FURY Beast DDR5', subtitle: 'Reliable performance', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '5600MT/s' } },
  { id: 504, title: 'Crucial Pro DDR5', subtitle: 'No-nonsense stability', category: 'MEMORY (RAM)', isNew: true, features: { Capacity: '32GB (2x16GB)', Speed: '5600MT/s' } },
  { id: 505, title: 'TeamGroup T-Force Delta RGB', subtitle: 'Striking aesthetics', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '6400MT/s' } },
  { id: 506, title: 'Corsair Vengeance LPX DDR4', subtitle: 'Classic DDR4 low profile', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '16GB (2x8GB)', Speed: '3200MT/s' } },
  { id: 507, title: 'G.Skill Ripjaws V DDR4', subtitle: 'Best value DDR4', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '3600MT/s' } },
];

// Attach fake reviews uniformly
productsData.forEach(p => {
  p.reviews = [
    { user: 'TechEnthusiast99', rating: 5, comment: 'Absolutely phenomenal product. Exceeded my expectations in every metric.' },
    { user: 'CasualBuilder', rating: 4, comment: 'Very good, does exactly what I need without any major issues.' }
  ];
});

export const getQuestionsForCategory = (category) => {
  switch(category) {
    case 'SSD':
      return [
        { label: "1. Ultra-fast Gen5 Speeds (Future proof)", recommendation: "Crucial T700" },
        { label: "2. Best mix of Gen4 speed & price", recommendation: "Samsung 990 Pro" },
        { label: "3. Maximum terabytes for the budget", recommendation: "Crucial MX500" }
      ];
    case 'GRAPHICS CARDS':
      return [
        { label: "1. Flawless 4K & Raytracing at max settings", recommendation: "NVIDIA RTX 4090" },
        { label: "2. Great 1440p gaming & good value", recommendation: "AMD Radeon RX 7800 XT" },
        { label: "3. Budget 1080p e-sports", recommendation: "AMD Radeon RX 7600" }
      ];
    case 'CPUs':
      return [
        { label: "1. 100% focused on maximizing gaming FPS", recommendation: "AMD Ryzen 7 7800X3D" },
        { label: "2. Heavy video editing and mixed rendering", recommendation: "Intel Core i9-14900K" },
        { label: "3. Good everyday value out of the box", recommendation: "Intel Core i5-13600K" }
      ];
    case 'TOOLS':
      return [
        { label: "1. I want to benchmark/test my hardware limits", recommendation: "CrystalDiskMark or Cinebench R24" },
        { label: "2. I need to figure out where my disk space went", recommendation: "WizTree" },
        { label: "3. I'm comparing the latest ecosystem AI features", recommendation: "Apple Intelligence vs Galaxy AI" }
      ];
    case 'MEMORY (RAM)':
      return [
        { label: "1. Flashy RGB DDR5 for new systems", recommendation: "G.Skill Trident Z5 RGB NEO" },
        { label: "2. Standard DDR5 without the lights", recommendation: "Crucial Pro DDR5" },
        { label: "3. Older system needing DDR4 upgrade", recommendation: "Corsair Vengeance LPX DDR4" }
      ];
    default:
      return [
        { label: "1. I want the absolute best hardware", recommendation: "NVIDIA RTX 4090" },
        { label: "2. I care mostly about storage", recommendation: "Samsung 990 Pro" },
        { label: "3. I just need to build a cheap PC", recommendation: "AMD Radeon RX 7600" }
      ];
  }
};

export const generateAISummary = (product) => {
  return `The ${product.title} is a solid performer in the ${product.category} space. Users frequently highlight its reliable performance and value ratio. While some enthusiasts note minor drawbacks in edge-cases, the overall sentiment remains overwhelmingly positive, making it a highly recommended choice for typical use cases.`;
};
