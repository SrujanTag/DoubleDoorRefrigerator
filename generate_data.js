const fs = require('fs');
const path = require('path');

const generateReviews = (title, category) => {
  const numReviews = Math.floor(Math.random() * 3) + 4; // 4 to 6 for the "latest reviews" summary
  
  const positiveAdjectives = ["Incredible", "Outstanding", "Solid", "Fantastic", "Great", "Excellent", "Brilliant"];
  const neutralAdjectives = ["Decent", "Okay", "Average", "Good enough", "Acceptable"];
  const features = {
    'SSD': ["speed", "Storage IO", "boot times", "file transfer times", "cooling"],
    'GRAPHICS CARDS': ["frame rates", "ray tracing", "1440p performance", "4K capability", "driver stability"],
    'CPUs': ["multitasking", "gaming performance", "render times", "power efficiency", "temperatures"],
    'TOOLS': ["UI", "accuracy", "speed of scan", "feature set", "reliability"],
    'MEMORY (RAM)': ["latency", "stutter reduction", "RGB lighting", "overclocking", "EXPO profiles"]
  };
  
  const featureList = features[category] || ["quality", "performance", "build", "value"];
  
  const reviews = [];
  for (let i = 0; i < numReviews; i++) {
    const isPositive = Math.random() > 0.15; // 85% mostly positive
    const rating = isPositive ? (Math.random() > 0.4 ? 5 : 4) : (Math.random() > 0.5 ? 3 : 2);
    
    const adj = isPositive 
      ? positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)] 
      : neutralAdjectives[Math.floor(Math.random() * neutralAdjectives.length)];
      
    const feat = featureList[Math.floor(Math.random() * featureList.length)];
    const feat2 = featureList[Math.floor(Math.random() * featureList.length)];
    
    let comment = ``;
    if (rating === 5) {
      comment = `${adj} product! The ${feat} is top tier. I've also noticed great improvements in ${feat2}. Highly recommend.`;
    } else if (rating === 4) {
      comment = `Very ${adj.toLowerCase()} choice. The ${feat} is definitely a plus. However, the ${feat2} could be a bit better. Overall very happy.`;
    } else {
      comment = `${adj} for the price, but fell short on ${feat}. Maybe look around before committing.`;
    }
    
    reviews.push({
      user: `User${Math.floor(Math.random() * 90000) + 10000}`,
      rating,
      comment
    });
  }
  return reviews;
};

const calcOverall = (scores) => {
  const vals = Object.values(scores);
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((a,b)=>a+b, 0) / vals.length);
};

const generateUserBenchmarks = (category, overall) => {
  const variance = () => (Math.random() * 0.2 - 0.1); 
  const val = (base, suffix) => Math.round(base * (1 + variance() + (overall - 85)/100)) + suffix;
  const floatVal = (base, suffix) => (base * (1 + variance() + (overall - 85)/100)).toFixed(1) + suffix;

  if (category === 'SSD') {
    return { 'CDM Seq Read': val(7000, ' MB/s'), 'CDM Seq Write': val(6500, ' MB/s'), 'Random 4K Read': val(1000, 'K IOPS'), 'Avg Load Temp': val(65, '°C') };
  } else if (category === 'GRAPHICS CARDS') {
    return { '3DMark TimeSpy': val(25000, ' pts'), 'Port Royal': val(15000, ' pts'), 'Cyberpunk 4K FPS': val(85, ' fps'), 'Alan Wake 2 1440p': val(110, ' fps') };
  } else if (category === 'CPUs') {
    return { 'Cinebench R23 Multi': val(35000, ' pts'), 'Cinebench R23 Single': val(2100, ' pts'), 'Blender Classroom': floatVal(4.5, ' mins'), 'Avg Load Temp': val(80, '°C') };
  } else if (category === 'TOOLS') {
    return { 'Value for Money': val(92, '%'), 'Feature Richness': val(88, '%'), 'Ease of Deployment': val(95, '%'), 'Community Support': val(90, '%') };
  } else if (category === 'MEMORY (RAM)') {
    return { 'AIDA64 Read': val(85000, ' MB/s'), 'AIDA64 Latency': floatVal(65, ' ns'), 'Y-Cruncher PI': floatVal(12, ' sec') };
  }
  return { 'User Satisfaction': val(90, '%'), 'Reliability': val(95, '%') };
};

const generateRatingStats = (overall) => {
  const total = Math.floor(Math.random() * 8000) + 2000;
  const r5 = Math.floor(total * (overall / 100) * 0.85);
  const r4 = Math.floor(total * 0.10);
  const r3 = Math.floor(total * 0.03);
  const r2 = Math.floor(total * 0.01);
  const r1 = total - (r5 + r4 + r3 + r2);
  const avg = ((r5*5 + r4*4 + r3*3 + r2*2 + r1*1) / total).toFixed(1);
  return { total, 5: r5, 4: r4, 3: r3, 2: r2, 1: r1, avg };
};

const getURL = (store, query) => {
  const q = encodeURIComponent(query);
  if (store === 'amazon') return `https://www.amazon.com/s?k=${q}`;
  if (store === 'flipkart') return `https://www.flipkart.com/search?q=${q}`;
  return `https://www.google.com/search?q=${q}+official+site`;
}

const productsD = [
  // SSDs
  { id: 101, title: 'Samsung 990 Pro', subtitle: 'Leading PCIe 4.0 NVMe', category: 'SSD', isNew: true, features: { Capacity: '2TB', Speed: '7450 MB/s' },
    specifications: { Capacity: '2TB', 'Read Speed': '7450 MB/s', 'Write Speed': '6900 MB/s', Interface: 'PCIe 4.0 x4', FormFactor: 'M.2 2280', Endurance: '1200 TBW' },
    scores: { Speed: 98, Reliability: 96, Value: 85, Thermal: 92 },
    prices: { amazon: { price: '$159', link: getURL('amazon', 'Samsung 990 Pro 2TB') }, flipkart: { price: '₹14,499', link: getURL('flipkart', 'Samsung 990 Pro 2TB') }, official: { price: '$169', link: getURL('official', 'Samsung 990 Pro') } }
  },
  { id: 102, title: 'WD Black SN850X', subtitle: 'High performance gaming SSD', category: 'SSD', isNew: false, features: { Capacity: '2TB', Speed: '7300 MB/s' },
    specifications: { Capacity: '2TB', 'Read Speed': '7300 MB/s', 'Write Speed': '6600 MB/s', Interface: 'PCIe 4.0 x4', FormFactor: 'M.2 2280', Endurance: '1200 TBW' },
    scores: { Speed: 96, Reliability: 93, Value: 89, Thermal: 88 },
    prices: { amazon: { price: '$149', link: getURL('amazon', 'WD Black SN850X 2TB') }, flipkart: { price: '₹13,999', link: getURL('flipkart', 'WD Black SN850X 2TB') }, official: { price: '$159', link: getURL('official', 'WD Black SN850X') } }
  },
  { id: 103, title: 'Crucial T700', subtitle: 'Next-gen PCIe 5.0 speed', category: 'SSD', isNew: true, features: { Capacity: '2TB', Speed: '12400 MB/s' },
    specifications: { Capacity: '2TB', 'Read Speed': '12400 MB/s', 'Write Speed': '11800 MB/s', Interface: 'PCIe 5.0 x4', FormFactor: 'M.2 2280', Endurance: '1200 TBW' },
    scores: { Speed: 100, Reliability: 90, Value: 75, Thermal: 70 },
    prices: { amazon: { price: '$269', link: getURL('amazon', 'Crucial T700 2TB') }, flipkart: { price: '₹25,999', link: getURL('flipkart', 'Crucial T700 2TB') }, official: { price: '$289', link: getURL('official', 'Crucial T700') } }
  },
  { id: 104, title: 'Kingston KC3000', subtitle: 'Reliable high-speed storage', category: 'SSD', isNew: false, features: { Capacity: '1TB', Speed: '7000 MB/s' },
    specifications: { Capacity: '1TB', 'Read Speed': '7000 MB/s', 'Write Speed': '6000 MB/s', Interface: 'PCIe 4.0 x4', FormFactor: 'M.2 2280', Endurance: '800 TBW' },
    scores: { Speed: 92, Reliability: 94, Value: 95, Thermal: 91 },
    prices: { amazon: { price: '$85', link: getURL('amazon', 'Kingston KC3000 1TB') }, flipkart: { price: '₹7,999', link: getURL('flipkart', 'Kingston KC3000 1TB') }, official: { price: '$95', link: getURL('official', 'Kingston KC3000') } }
  },
  { id: 105, title: 'Sabrent Rocket 4 Plus', subtitle: 'Enthusiast level performance', category: 'SSD', isNew: false, features: { Capacity: '4TB', Speed: '7100 MB/s' },
    specifications: { Capacity: '4TB', 'Read Speed': '7100 MB/s', 'Write Speed': '6600 MB/s', Interface: 'PCIe 4.0 x4', FormFactor: 'M.2 2280', Endurance: '2800 TBW' },
    scores: { Speed: 94, Reliability: 95, Value: 82, Thermal: 85 },
    prices: { amazon: { price: '$399', link: getURL('amazon', 'Sabrent Rocket 4 Plus 4TB') }, flipkart: { price: '₹38,000', link: getURL('flipkart', 'Sabrent Rocket 4 Plus 4TB') }, official: { price: '$420', link: getURL('official', 'Sabrent Rocket 4 Plus') } }
  },
  { id: 106, title: 'TeamGroup MP34', subtitle: 'Affordable NVMe option', category: 'SSD', isNew: false, features: { Capacity: '1TB', Speed: '3400 MB/s' },
    specifications: { Capacity: '1TB', 'Read Speed': '3400 MB/s', 'Write Speed': '2900 MB/s', Interface: 'PCIe 3.0 x4', FormFactor: 'M.2 2280', Endurance: '1660 TBW' },
    scores: { Speed: 75, Reliability: 90, Value: 98, Thermal: 95 },
    prices: { amazon: { price: '$49', link: getURL('amazon', 'TeamGroup MP34 1TB') }, flipkart: { price: '₹4,500', link: getURL('flipkart', 'TeamGroup MP34 1TB') }, official: { price: '$55', link: getURL('official', 'TeamGroup MP34') } }
  },
  { id: 107, title: 'Crucial MX500', subtitle: 'Classic SATA SSD', category: 'SSD', isNew: false, features: { Capacity: '1TB', Speed: '560 MB/s' },
    specifications: { Capacity: '1TB', 'Read Speed': '560 MB/s', 'Write Speed': '510 MB/s', Interface: 'SATA III', FormFactor: '2.5 inch', Endurance: '360 TBW' },
    scores: { Speed: 50, Reliability: 98, Value: 95, Thermal: 99 },
    prices: { amazon: { price: '$55', link: getURL('amazon', 'Crucial MX500 1TB') }, flipkart: { price: '₹4,999', link: getURL('flipkart', 'Crucial MX500 1TB') }, official: { price: '$60', link: getURL('official', 'Crucial MX500') } }
  },
  { id: 108, title: 'Corsair MP600 Pro', subtitle: 'Heatsink equipped NVMe', category: 'SSD', isNew: false, features: { Capacity: '2TB', Speed: '7100 MB/s' },
    specifications: { Capacity: '2TB', 'Read Speed': '7100 MB/s', 'Write Speed': '6800 MB/s', Interface: 'PCIe 4.0 x4', FormFactor: 'M.2 2280 w/ Heatsink', Endurance: '1400 TBW' },
    scores: { Speed: 94, Reliability: 96, Value: 85, Thermal: 98 },
    prices: { amazon: { price: '$155', link: getURL('amazon', 'Corsair MP600 Pro 2TB') }, flipkart: { price: '₹14,800', link: getURL('flipkart', 'Corsair MP600 Pro 2TB') }, official: { price: '$165', link: getURL('official', 'Corsair MP600 Pro') } }
  },

  // Graphics Cards
  { id: 201, title: 'NVIDIA RTX 4090', subtitle: 'The ultimate GPU', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '24GB GDDR6X', Power: '450W' },
    specifications: { Architecture: 'Ada Lovelace', CudaCores: '16384', VRAM: '24GB GDDR6X', 'Boost Clock': '2.52 GHz', Power: '450W', Bandwidth: '1008 GB/s' },
    scores: { Gaming: 100, RayTracing: 100, Value: 60, Efficiency: 90 },
    prices: { amazon: { price: '$1599', link: getURL('amazon', 'NVIDIA RTX 4090') }, flipkart: { price: '₹1,55,000', link: getURL('flipkart', 'NVIDIA RTX 4090') }, official: { price: '$1599', link: getURL('official', 'NVIDIA RTX 4090') } }
  },
  { id: 202, title: 'AMD Radeon RX 7900 XTX', subtitle: 'Flagship AMD performance', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '24GB GDDR6', Power: '355W' },
    specifications: { Architecture: 'RDNA 3', StreamProcessors: '6144', VRAM: '24GB GDDR6', 'Boost Clock': '2.50 GHz', Power: '355W', Bandwidth: '960 GB/s' },
    scores: { Gaming: 96, RayTracing: 82, Value: 85, Efficiency: 88 },
    prices: { amazon: { price: '$950', link: getURL('amazon', 'AMD Radeon RX 7900 XTX') }, flipkart: { price: '₹95,000', link: getURL('flipkart', 'AMD Radeon RX 7900 XTX') }, official: { price: '$999', link: getURL('official', 'AMD Radeon RX 7900 XTX') } }
  },
  { id: 203, title: 'NVIDIA RTX 4080 Super', subtitle: 'High-end 4K gaming', category: 'GRAPHICS CARDS', isNew: true, features: { VRAM: '16GB GDDR6X', Power: '320W' },
    specifications: { Architecture: 'Ada Lovelace', CudaCores: '10240', VRAM: '16GB GDDR6X', 'Boost Clock': '2.55 GHz', Power: '320W', Bandwidth: '736 GB/s' },
    scores: { Gaming: 94, RayTracing: 95, Value: 82, Efficiency: 94 },
    prices: { amazon: { price: '$999', link: getURL('amazon', 'NVIDIA RTX 4080 Super') }, flipkart: { price: '₹99,999', link: getURL('flipkart', 'NVIDIA RTX 4080 Super') }, official: { price: '$999', link: getURL('official', 'NVIDIA RTX 4080 Super') } }
  },
  { id: 204, title: 'AMD Radeon RX 7800 XT', subtitle: '1440p sweet spot', category: 'GRAPHICS CARDS', isNew: true, features: { VRAM: '16GB GDDR6', Power: '263W' },
    specifications: { Architecture: 'RDNA 3', StreamProcessors: '3840', VRAM: '16GB GDDR6', 'Boost Clock': '2.43 GHz', Power: '263W', Bandwidth: '624 GB/s' },
    scores: { Gaming: 86, RayTracing: 70, Value: 95, Efficiency: 85 },
    prices: { amazon: { price: '$499', link: getURL('amazon', 'AMD Radeon RX 7800 XT') }, flipkart: { price: '₹47,000', link: getURL('flipkart', 'AMD Radeon RX 7800 XT') }, official: { price: '$499', link: getURL('official', 'AMD Radeon RX 7800 XT') } }
  },
  { id: 205, title: 'NVIDIA RTX 4070 Ti Super', subtitle: 'Premium 1440p / Entry 4K', category: 'GRAPHICS CARDS', isNew: true, features: { VRAM: '16GB GDDR6X', Power: '285W' },
    specifications: { Architecture: 'Ada Lovelace', CudaCores: '8448', VRAM: '16GB GDDR6X', 'Boost Clock': '2.61 GHz', Power: '285W', Bandwidth: '672 GB/s' },
    scores: { Gaming: 89, RayTracing: 90, Value: 88, Efficiency: 92 },
    prices: { amazon: { price: '$799', link: getURL('amazon', 'NVIDIA RTX 4070 Ti Super') }, flipkart: { price: '₹75,000', link: getURL('flipkart', 'NVIDIA RTX 4070 Ti Super') }, official: { price: '$799', link: getURL('official', 'NVIDIA RTX 4070 Ti Super') } }
  },
  { id: 206, title: 'AMD Radeon RX 7600', subtitle: 'Budget 1080p gaming', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '8GB GDDR6', Power: '165W' },
    specifications: { Architecture: 'RDNA 3', StreamProcessors: '2048', VRAM: '8GB GDDR6', 'Boost Clock': '2.65 GHz', Power: '165W', Bandwidth: '288 GB/s' },
    scores: { Gaming: 75, RayTracing: 50, Value: 92, Efficiency: 89 },
    prices: { amazon: { price: '$259', link: getURL('amazon', 'AMD Radeon RX 7600') }, flipkart: { price: '₹24,900', link: getURL('flipkart', 'AMD Radeon RX 7600') }, official: { price: '$269', link: getURL('official', 'AMD Radeon RX 7600') } }
  },
  { id: 207, title: 'NVIDIA RTX 3060', subtitle: 'Most popular mainstream GPU', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '12GB GDDR6', Power: '170W' },
    specifications: { Architecture: 'Ampere', CudaCores: '3584', VRAM: '12GB GDDR6', 'Boost Clock': '1.78 GHz', Power: '170W', Bandwidth: '360 GB/s' },
    scores: { Gaming: 72, RayTracing: 65, Value: 90, Efficiency: 85 },
    prices: { amazon: { price: '$280', link: getURL('amazon', 'NVIDIA RTX 3060') }, flipkart: { price: '₹26,000', link: getURL('flipkart', 'NVIDIA RTX 3060') }, official: { price: '$329', link: getURL('official', 'NVIDIA RTX 3060') } }
  },
  { id: 208, title: 'Intel Arc A770', subtitle: 'Intel\'s flagship entry', category: 'GRAPHICS CARDS', isNew: false, features: { VRAM: '16GB GDDR6', Power: '225W' },
    specifications: { Architecture: 'Alchemist', XeCores: '32', VRAM: '16GB GDDR6', 'Boost Clock': '2.10 GHz', Power: '225W', Bandwidth: '512 GB/s' },
    scores: { Gaming: 76, RayTracing: 78, Value: 89, Efficiency: 75 },
    prices: { amazon: { price: '$290', link: getURL('amazon', 'Intel Arc A770') }, flipkart: { price: '₹28,500', link: getURL('flipkart', 'Intel Arc A770') }, official: { price: '$349', link: getURL('official', 'Intel Arc A770') } }
  },

  // CPUs
  { id: 301, title: 'AMD Ryzen 7 7800X3D', subtitle: 'Best gaming CPU', category: 'CPUs', isNew: false, features: { Cores: '8C/16T', Boost: '5.0 GHz' },
    specifications: { Cores: '8', Threads: '16', 'Base Clock': '4.2 GHz', 'Boost Clock': '5.0 GHz', 'L3 Cache': '96MB (3D V-Cache)', TDP: '120W' },
    scores: { Gaming: 100, Productivity: 82, Value: 95, Efficiency: 98 },
    prices: { amazon: { price: '$369', link: getURL('amazon', 'AMD Ryzen 7 7800X3D') }, flipkart: { price: '₹35,000', link: getURL('flipkart', 'AMD Ryzen 7 7800X3D') }, official: { price: '$449', link: getURL('official', 'AMD Ryzen 7 7800X3D') } }
  },
  { id: 302, title: 'Intel Core i9-14900K', subtitle: 'Ultimate hybrid performance', category: 'CPUs', isNew: true, features: { Cores: '24C/32T', Boost: '6.0 GHz' },
    specifications: { Cores: '24 (8P+16E)', Threads: '32', 'Base Clock': '3.2 GHz', 'Boost Clock': '6.0 GHz', 'L3 Cache': '36MB', TDP: '125W (253W Max)' },
    scores: { Gaming: 98, Productivity: 100, Value: 75, Efficiency: 70 },
    prices: { amazon: { price: '$549', link: getURL('amazon', 'Intel Core i9-14900K') }, flipkart: { price: '₹53,000', link: getURL('flipkart', 'Intel Core i9-14900K') }, official: { price: '$589', link: getURL('official', 'Intel Core i9-14900K') } }
  },
  { id: 303, title: 'AMD Ryzen 9 7950X', subtitle: 'Top tier productivity', category: 'CPUs', isNew: false, features: { Cores: '16C/32T', Boost: '5.7 GHz' },
    specifications: { Cores: '16', Threads: '32', 'Base Clock': '4.5 GHz', 'Boost Clock': '5.7 GHz', 'L3 Cache': '64MB', TDP: '170W' },
    scores: { Gaming: 90, Productivity: 99, Value: 85, Efficiency: 88 },
    prices: { amazon: { price: '$530', link: getURL('amazon', 'AMD Ryzen 9 7950X') }, flipkart: { price: '₹51,000', link: getURL('flipkart', 'AMD Ryzen 9 7950X') }, official: { price: '$699', link: getURL('official', 'AMD Ryzen 9 7950X') } }
  },
  { id: 304, title: 'Intel Core i5-13600K', subtitle: 'Value and performance', category: 'CPUs', isNew: false, features: { Cores: '14C/20T', Boost: '5.1 GHz' },
    specifications: { Cores: '14 (6P+8E)', Threads: '20', 'Base Clock': '3.5 GHz', 'Boost Clock': '5.1 GHz', 'L3 Cache': '24MB', TDP: '125W (181W Max)' },
    scores: { Gaming: 92, Productivity: 88, Value: 96, Efficiency: 85 },
    prices: { amazon: { price: '$280', link: getURL('amazon', 'Intel Core i5-13600K') }, flipkart: { price: '₹27,500', link: getURL('flipkart', 'Intel Core i5-13600K') }, official: { price: '$319', link: getURL('official', 'Intel Core i5-13600K') } }
  },
  { id: 305, title: 'AMD Ryzen 5 7600X', subtitle: 'Great entry to AM5', category: 'CPUs', isNew: false, features: { Cores: '6C/12T', Boost: '5.3 GHz' },
    specifications: { Cores: '6', Threads: '12', 'Base Clock': '4.7 GHz', 'Boost Clock': '5.3 GHz', 'L3 Cache': '32MB', TDP: '105W' },
    scores: { Gaming: 88, Productivity: 78, Value: 94, Efficiency: 90 },
    prices: { amazon: { price: '$220', link: getURL('amazon', 'AMD Ryzen 5 7600X') }, flipkart: { price: '₹21,000', link: getURL('flipkart', 'AMD Ryzen 5 7600X') }, official: { price: '$299', link: getURL('official', 'AMD Ryzen 5 7600X') } }
  },
  { id: 306, title: 'Intel Core i7-14700K', subtitle: 'High-end all rounder', category: 'CPUs', isNew: true, features: { Cores: '20C/28T', Boost: '5.6 GHz' },
    specifications: { Cores: '20 (8P+12E)', Threads: '28', 'Base Clock': '3.4 GHz', 'Boost Clock': '5.6 GHz', 'L3 Cache': '33MB', TDP: '125W (253W Max)' },
    scores: { Gaming: 95, Productivity: 94, Value: 90, Efficiency: 75 },
    prices: { amazon: { price: '$390', link: getURL('amazon', 'Intel Core i7-14700K') }, flipkart: { price: '₹38,000', link: getURL('flipkart', 'Intel Core i7-14700K') }, official: { price: '$409', link: getURL('official', 'Intel Core i7-14700K') } }
  },
  { id: 307, title: 'AMD Ryzen 5 5600X', subtitle: 'Budget AM4 king', category: 'CPUs', isNew: false, features: { Cores: '6C/12T', Boost: '4.6 GHz' },
    specifications: { Cores: '6', Threads: '12', 'Base Clock': '3.7 GHz', 'Boost Clock': '4.6 GHz', 'L3 Cache': '32MB', TDP: '65W' },
    scores: { Gaming: 80, Productivity: 70, Value: 98, Efficiency: 96 },
    prices: { amazon: { price: '$135', link: getURL('amazon', 'AMD Ryzen 5 5600X') }, flipkart: { price: '₹14,500', link: getURL('flipkart', 'AMD Ryzen 5 5600X') }, official: { price: '$299', link: getURL('official', 'AMD Ryzen 5 5600X') } }
  },

  // Tools
  { id: 401, title: 'CrystalDiskMark', subtitle: 'Storage benchmark utility', category: 'TOOLS', isNew: false, features: { Type: 'Benchmarking', License: 'Open Source' },
    specifications: { Type: 'Benchmarking', Platform: 'Windows', Engine: 'Microsoft DiskSpd', Support: 'NVMe, SATA, USB', License: 'Open Source (MIT)' },
    scores: { Accuracy: 98, Speed: 95, EaseOfUse: 92 },
    prices: { amazon: { price: 'Free', link: 'https://crystalmark.info/en/' }, flipkart: { price: 'Free', link: 'https://crystalmark.info/en/' }, official: { price: 'Free', link: 'https://crystalmark.info/en/' } }
  },
  { id: 402, title: 'WizTree', subtitle: 'Extremely fast disk space analyzer', category: 'TOOLS', isNew: false, features: { Type: 'Analytics', Speed: 'MFT based' },
    specifications: { Type: 'Analytics', Platform: 'Windows', Technology: 'Direct MFT Parsing', Export: 'CSV/HTML', License: 'Free for Personal' },
    scores: { Accuracy: 99, Speed: 100, EaseOfUse: 95 },
    prices: { amazon: { price: 'Free', link: 'https://diskanalyzer.com/' }, flipkart: { price: 'Free', link: 'https://diskanalyzer.com/' }, official: { price: 'Free', link: 'https://diskanalyzer.com/' } }
  },
  { id: 403, title: 'Samsung Magician', subtitle: 'SSD management software', category: 'TOOLS', isNew: false, features: { Ecosystem: 'Samsung', Type: 'Optimization' },
    specifications: { Type: 'Optimization', Platform: 'Windows/Mac', Target: 'Samsung SSDs', Features: 'Firmware Update, Secure Erase, Overprovisioning', License: 'Proprietary Freeware' },
    scores: { Accuracy: 94, Speed: 90, EaseOfUse: 98 },
    prices: { amazon: { price: 'Free', link: 'https://semiconductor.samsung.com/consumer-storage/magician/' }, flipkart: { price: 'Free', link: 'https://semiconductor.samsung.com/consumer-storage/magician/' }, official: { price: 'Free', link: 'https://semiconductor.samsung.com/consumer-storage/magician/' } }
  },
  { id: 404, title: 'Apple Intelligence', subtitle: 'Advanced AI features for Apple ecosystem', category: 'TOOLS', isNew: true, features: { Ecosystem: 'Apple', Type: 'Generative AI' },
    specifications: { Type: 'Generative AI', Platform: 'iOS/macOS', Models: 'On-device + Private Cloud', Integration: 'System-wide', Requirements: 'A17 Pro or M1+' },
    scores: { Utility: 92, Innovation: 95, Privacy: 98 },
    prices: { amazon: { price: 'Included', link: 'https://apple.com' }, flipkart: { price: 'Included', link: 'https://apple.com' }, official: { price: 'Included with Devices', link: 'https://www.apple.com/apple-intelligence/' } }
  },
  { id: 405, title: 'Galaxy AI', subtitle: "Samsung's integrated mobile AI", category: 'TOOLS', isNew: true, features: { Ecosystem: 'Android/Samsung', Type: 'Generative AI' },
    specifications: { Type: 'Generative AI', Platform: 'Android (OneUI)', Models: 'Google Gemini Pro / Nano', Features: 'Live Translate, Circle to Search', Devices: 'S23/S24 series' },
    scores: { Utility: 95, Innovation: 90, Integration: 94 },
    prices: { amazon: { price: 'Included', link: 'https://samsung.com' }, flipkart: { price: 'Included', link: 'https://samsung.com' }, official: { price: 'Free until 2025', link: 'https://www.samsung.com/global/galaxy/galaxy-ai/' } }
  },
  { id: 406, title: 'HWMonitor', subtitle: 'Hardware sensor monitoring tool', category: 'TOOLS', isNew: false, features: { Type: 'Diagnostics', Sensors: 'Temps, Voltages, Fans' },
    specifications: { Type: 'Diagnostics', Platform: 'Windows', Sensors: 'Thermal, Voltage, Fan Speed, Power', Export: 'TXT Logs', License: 'Freemium' },
    scores: { Accuracy: 90, Detail: 94, EaseOfUse: 85 },
    prices: { amazon: { price: 'Free', link: 'https://cpuid.com' }, flipkart: { price: 'Free', link: 'https://cpuid.com' }, official: { price: 'Free / €20 Pro', link: 'https://www.cpuid.com/softwares/hwmonitor.html' } }
  },
  { id: 407, title: 'Cinebench R24', subtitle: 'CPU/GPU rendering benchmark', category: 'TOOLS', isNew: false, features: { Engine: 'Redshift', Focus: 'Stress Testing' },
    specifications: { Type: 'Benchmarking', Platform: 'Windows/Mac', Engine: 'Redshift 3D', Support: 'x86, ARM, GPUs', License: 'Free' },
    scores: { Accuracy: 98, Detail: 92, EaseOfUse: 96 },
    prices: { amazon: { price: 'Free', link: 'https://maxon.net' }, flipkart: { price: 'Free', link: 'https://maxon.net' }, official: { price: 'Free', link: 'https://www.maxon.net/en/cinebench' } }
  },
  { id: 408, title: 'Rufus', subtitle: 'Create bootable USB drives', category: 'TOOLS', isNew: false, features: { Type: 'System Utility', SupportedOS: 'Windows/Linux' },
    specifications: { Type: 'Utility', Platform: 'Windows', Output: 'Bootable USBs (ISO/DD)', Speed: 'Extremely Fast', Bypass: 'Windows 11 TPM checks' },
    scores: { Utility: 99, Reliability: 100, EaseOfUse: 98 },
    prices: { amazon: { price: 'Free', link: 'https://rufus.ie' }, flipkart: { price: 'Free', link: 'https://rufus.ie' }, official: { price: 'Free (GPL)', link: 'https://rufus.ie/en/' } }
  },

  // Memory (RAM)
  { id: 501, title: 'Corsair Vengeance RGB DDR5', subtitle: 'Popular RGB DDR5', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '6000MT/s' },
    specifications: { Capacity: '32GB (2x16GB)', Speed: '6000 MT/s', CAS: 'CL36', Voltage: '1.35V', Profile: 'XMP 3.0 / EXPO', RGB: 'Yes (iCUE)' },
    scores: { Speed: 90, Reliability: 95, Value: 85, Aesthetics: 96 },
    prices: { amazon: { price: '$110', link: getURL('amazon', 'Corsair Vengeance RGB DDR5 32GB 6000') }, flipkart: { price: '₹11,000', link: getURL('flipkart', 'Corsair Vengeance DDR5') }, official: { price: '$120', link: getURL('official', 'Corsair Vengeance RGB DDR5') } }
  },
  { id: 502, title: 'G.Skill Trident Z5 RGB NEO', subtitle: 'Optimized for AMD EXPO', category: 'MEMORY (RAM)', isNew: true, features: { Capacity: '32GB (2x16GB)', Speed: '6000MT/s' },
    specifications: { Capacity: '32GB (2x16GB)', Speed: '6000 MT/s', CAS: 'CL30', Voltage: '1.35V', Profile: 'EXPO (AMD)', RGB: 'Yes' },
    scores: { Speed: 95, Reliability: 94, Value: 88, Aesthetics: 98 },
    prices: { amazon: { price: '$115', link: getURL('amazon', 'G.Skill Trident Z5 RGB NEO 32GB') }, flipkart: { price: '₹12,000', link: getURL('flipkart', 'G.Skill Trident Z5 NEO') }, official: { price: '$130', link: getURL('official', 'G.Skill Trident Z5 NEO') } }
  },
  { id: 503, title: 'Kingston FURY Beast DDR5', subtitle: 'Reliable performance', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '5600MT/s' },
    specifications: { Capacity: '32GB (2x16GB)', Speed: '5600 MT/s', CAS: 'CL40', Voltage: '1.25V', Profile: 'XMP 3.0', RGB: 'No' },
    scores: { Speed: 80, Reliability: 98, Value: 92, Aesthetics: 75 },
    prices: { amazon: { price: '$90', link: getURL('amazon', 'Kingston FURY Beast DDR5 32GB') }, flipkart: { price: '₹9,000', link: getURL('flipkart', 'Kingston FURY Beast') }, official: { price: '$100', link: getURL('official', 'Kingston FURY Beast') } }
  },
  { id: 504, title: 'Crucial Pro DDR5', subtitle: 'No-nonsense stability', category: 'MEMORY (RAM)', isNew: true, features: { Capacity: '32GB (2x16GB)', Speed: '5600MT/s' },
    specifications: { Capacity: '32GB (2x16GB)', Speed: '5600 MT/s', CAS: 'CL46', Voltage: '1.1V', Profile: 'JEDEC / XMP 3.0', RGB: 'No' },
    scores: { Speed: 78, Reliability: 99, Value: 95, Aesthetics: 70 },
    prices: { amazon: { price: '$85', link: getURL('amazon', 'Crucial Pro DDR5 32GB') }, flipkart: { price: '₹8,500', link: getURL('flipkart', 'Crucial Pro DDR5') }, official: { price: '$95', link: getURL('official', 'Crucial Pro DDR5') } }
  },
  { id: 505, title: 'TeamGroup T-Force Delta RGB', subtitle: 'Striking aesthetics', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '6400MT/s' },
    specifications: { Capacity: '32GB (2x16GB)', Speed: '6400 MT/s', CAS: 'CL40', Voltage: '1.35V', Profile: 'XMP 3.0', RGB: 'Yes (120° Angle)' },
    scores: { Speed: 96, Reliability: 92, Value: 90, Aesthetics: 97 },
    prices: { amazon: { price: '$105', link: getURL('amazon', 'TeamGroup T-Force Delta RGB 32GB') }, flipkart: { price: '₹10,500', link: getURL('flipkart', 'TeamGroup T-Force Delta') }, official: { price: '$110', link: getURL('official', 'TeamGroup T-Force Delta') } }
  },
  { id: 506, title: 'Corsair Vengeance LPX DDR4', subtitle: 'Classic DDR4 low profile', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '16GB (2x8GB)', Speed: '3200MT/s' },
    specifications: { Capacity: '16GB (2x8GB)', Speed: '3200 MT/s', CAS: 'CL16', Voltage: '1.35V', Profile: 'XMP 2.0', RGB: 'No' },
    scores: { Speed: 70, Reliability: 98, Value: 99, Aesthetics: 75 },
    prices: { amazon: { price: '$40', link: getURL('amazon', 'Corsair Vengeance LPX DDR4 16GB') }, flipkart: { price: '₹3,500', link: getURL('flipkart', 'Corsair Vengeance LPX DDR4') }, official: { price: '$45', link: getURL('official', 'Corsair Vengeance LPX') } }
  },
  { id: 507, title: 'G.Skill Ripjaws V DDR4', subtitle: 'Best value DDR4', category: 'MEMORY (RAM)', isNew: false, features: { Capacity: '32GB (2x16GB)', Speed: '3600MT/s' },
    specifications: { Capacity: '32GB (2x16GB)', Speed: '3600 MT/s', CAS: 'CL18', Voltage: '1.35V', Profile: 'XMP 2.0', RGB: 'No' },
    scores: { Speed: 75, Reliability: 96, Value: 100, Aesthetics: 80 },
    prices: { amazon: { price: '$65', link: getURL('amazon', 'G.Skill Ripjaws V 32GB') }, flipkart: { price: '₹6,000', link: getURL('flipkart', 'G.Skill Ripjaws V') }, official: { price: '$70', link: getURL('official', 'G.Skill Ripjaws V') } }
  }
];

// Enrich with reviews and overall scores
productsD.forEach(p => {
  p.scores.Overall = calcOverall(p.scores);
  p.reviews = generateReviews(p.title, p.category);
  p.benchmarks = generateUserBenchmarks(p.category, p.scores.Overall);
  p.ratingStats = generateRatingStats(p.scores.Overall);
});

const content = `/* Auto-generated data.js with enriched reviews, stats, and prices */
export const productsData = ${JSON.stringify(productsD, null, 2)};

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
  const totRev = product.ratingStats ? product.ratingStats.total : product.reviews.length;
  const avgRating = product.ratingStats ? product.ratingStats.avg : (product.reviews.reduce((acc, curr) => acc + curr.rating, 0) / totRev).toFixed(1);
  return \`The \${product.title} is a highly regarded option in the \${product.category} space. Based on an AI analysis of over \${totRev.toLocaleString()} user reviews, it holds an average rating of \${avgRating} out of 5 stars. Users consistently praise its \${Object.keys(product.scores)[0]} score of \${product.scores[Object.keys(product.scores)[0]]}/100 and excellent performance. While a few reviewers noted minor concerns with \${Object.keys(product.scores)[2]}, the overall consensus is overwhelmingly positive, earning an impressive CompareXscore of \${product.scores.Overall}/100. It is a highly recommended choice for typical use cases.\`;
};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data.js'), content, 'utf-8');
console.log('Successfully generated complete data.js with reviews, scores, specifications and prices.');
