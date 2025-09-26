const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

async function initializeProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if products already exist
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`📊 Found ${existingCount} existing products`);
      const overwrite = process.argv.includes('--overwrite');
      if (!overwrite) {
        console.log('ℹ️  Use --overwrite flag to replace existing products');
        return;
      }
      console.log('🔄 Overwriting existing products...');
      await Product.deleteMany({});
    }

    // Products data
    const products = [
      {
        slug: "synthetic-fibre",
        name: "Synthetic Fibre",
        bgImage: "/images/steel-fiber-img.png",
        description: "Empowering Fibre Reinforcement Technology",
        extraLine: "Recron 3s - Making a stronger world",
        logoImg: ["/images/recron-s3.png"],
        image: "/images/synthetic-fiber-p.png",
        overview: "Concrete often suffers from brittleness, low tensile strength, and shrinkage cracks. Synthetic Fibre, made from micro polyester and polypropylene, significantly enhances concrete performance by improving crack resistance, increasing tensile strength, and ensuring better bonding. It is specifically designed for projects facing repeated stress, temperature variations, and exposure to moisture. This fibre reinforcement is extensively used in industrial flooring, precast structures, tunnel linings, and road pavements to increase the durability and flexibility of concrete. </br></br> Recron® 3s can add muscle to concrete.  A specialty secondary reinforcement additive, Recron® 3s adds toughness and tensile strength to concrete, while helping resist shrinkage and cracking. It also bonds better with the mix, thanks to a unique triangular cross section and dimensional stability. <br><br>Developed after extensive research at the Reliance Technology Centre, Recron® 3s has been widely used in a variety of applications. You can be sure that it will add value to the special structures you build. <br><br>Accredited by leading industry bodies such as BIS, CPWD, PWD, MES, Railways, CRRI, IRC and NHAI.",
        specifications: [
          {
            title: "Product Type",
            value: "Polyester and Polypropylene (Mono filament)"
          },
          {
            title: "Length",
            value: "1mm, 3mm, 6mm, 12mm, 18mm"
          },
          {
            title: "Pack Size",
            value: "125gm, 900gm and 1 Kg"
          },
          {
            title: "Compliance",
            value: "Complies with IS 16481:2022, EN 14889-2:2006 of EU"
          },
          {
            title: "Tested by",
            value: "IIT Madras, CBRI Roorkee, CRRI, SVNIT Surat, UBC Canada"
          }
        ],
        application: [
          "Plastering",
          "Slab on Grade",
          "Raft",
          "Basements",
          "Foundations",
          "Water Retaining Structures",
          "Parking Slabs",
          "Beam & Columns",
          "Open Drains",
          "Thin White Topping",
          "Pavement Quality Concrete (PQC)",
          "Tunnel Lining"
        ],
        advantages: [],
        keyFeatures: [
          "Improves resistance of plastic & drying shrinkage/cracking",
          "Inhibits Propagation of micro-cracks and provides stability to concrete",
          "Improves flexural toughness and split tensile strength",
          "Enhances abrasion resistance and increases energy absorption of concrete, thereby improving impact resistance",
          "Aids in making concrete more homogenous",
          "Reduces permeability in concrete",
          "Improves durability and enhances longevity of the structure"
        ],
        images: [
          "/images/synthetic-8.jpg",
          "/images/synthetic-4.jpg",
          "/images/synthetic-9.png",
          "/images/synthetic-10.png",
          "/images/synthetic-11.png"
        ],
        pdfURL: "/pdf/synthetic-fibre.pdf",
        category: "synthetic-fibre",
        isActive: true,
        featured: true
      },
      {
        slug: "antrocel-g",
        name: "Antrocel-G",
        bgImage: "/images/antrocel-2.jpg",
        description: "High-Performance Glass Fibre for Concrete Reinforcement",
        extraLine: "Advanced Glass Fibre for Stronger Concrete",
        logoImg: [],
        image: "/images/antrocel-2.jpg",
        overview: "Antrocel-G is a specially engineered glass fibre reinforcement that significantly enhances the strength and flexibility of concrete structures. It effectively reduces shrinkage cracks, improves impact resistance, and ensures long-term performance, even in harsh environments. Designed for use in precast elements, repair applications, and industrial flooring, Antrocel-G provides excellent bonding characteristics, ensuring a uniform distribution of fibres within the concrete mix. It is a superior alternative to traditional steel reinforcements, reducing the risk of corrosion while enhancing durability.",
        specifications: [
          {
            title: "Product Type",
            value: "Glass Fibre Reinforcement"
          },
          {
            title: "Length",
            value: "3mm, 6mm, 12mm, 18mm, 24mm"
          },
          {
            title: "Compliance",
            value: "Complies with ASTM C1666, EN 14889-2"
          },
          {
            title: "Tested by",
            value: "IIT Madras, CBRI Roorkee, CRRI, SVNIT Surat"
          }
        ],
        application: [
          "Precast Elements",
          "Industrial Flooring",
          "Repair Applications",
          "Architectural Panels",
          "Tunneling",
          "Marine Structures"
        ],
        advantages: [],
        keyFeatures: [
          "Provides superior tensile strength",
          "Minimizes shrinkage cracks",
          "Enhances impact resistance",
          "Ensures excellent workability and uniform distribution",
          "Reduces risk of corrosion compared to steel reinforcements",
          "Improves durability and longevity of structures"
        ],
        images: [
          "/images/antrocel-g.jpg",
          "/images/antrocel-1.jpg",
          "/images/antrocel-2.jpg",
          "/images/antrocel-3.jpg",
          "/images/antrocel-5.jpg"
        ],
        pdfURL: "",
        category: "glass-fibre",
        isActive: true,
        featured: true
      },
      {
        slug: "steel-fibre",
        name: "Steel Fibre",
        bgImage: "/images/steel-3.jpg",
        description: "Vajra Shakti - Making a stronger world",
        extraLine: "Advanced Steel Fibre for Heavy-Duty Applications",
        logoImg: ["/images/vajra-shakti.png"],
        image: "/images/steel-3.jpg",
        overview: "<p>Steel Fibre reinforcement is an innovative solution for improving the structural integrity and performance of concrete. It enhances flexural strength, fatigue resistance, and impact absorption, making it an ideal choice for heavy-duty applications such as industrial floors, bridge decks, and tunnel linings. By controlling crack propagation and improving load-bearing capacity, Steel Fibre reduces reliance on conventional steel reinforcements, leading to cost savings and improved construction efficiency. With excellent durability and resistance to extreme environmental conditions, it is a preferred choice for long-term structural performance.</p> <br/> <p>Vajra Shakti Steel fibers are low carbon & cold drawn steel wire fibre manufactured by quality base primary steel bar. It has excellent mechanical properties including high tensile strength. Due to its High strength and uniform distribution of fibers, stresses can be fully dispersed and cracking propagation be effectively controlled. Steel Fibers are reliable, cost-efficient concrete reinforcement which provide temperature & shrinkage crack control, enhanced flexural reinforcement, improved shear strength and increase the crack resistance of concrete. It is designed to be easy to mix, place and finish in any concrete mix. It provides excellent load transfer in the crack, it stabilizes load-bearing capacity after appearance of crack. Vajra Shakti Steel Fibres complies with all ASTM & EN Standards.</p>",
        specifications: [
          {
            title: "Product Type",
            value: "Steel Fibre for Concrete Reinforcement"
          },
          {
            title: "Material",
            value: "Low Carbon, Galvanized or Stainless Steel"
          },
          {
            title: "Lengths Available",
            value: "30mm, 50mm, 60mm"
          },
          {
            title: "Aspect Ratio",
            value: "40 to 80"
          },
          {
            title: "Compliance",
            value: "Meets ASTM A820, EN 14889-1 Standards"
          },
          {
            title: "Tested By",
            value: "IIT Madras, CBRI Roorkee, CRRI, SVNIT Surat"
          },
          {
            title: "Grades",
            value: "Hookend Steel Fibre, Glued Hookend Steel Fibre, Flat Crimped, Undulated Hookend Steel Fibre"
          },
          {
            title: "Pack Size",
            value: "25 Kg"
          }
        ],
        application: [
          "Commercial and industrial slabs on ground",
          "Bridge decks",
          "Overlays and pavements",
          "Precast concrete applications",
          "Shotcrete",
          "Tunnel linings and slope stabilization",
          "Blast resistant concrete",
          "External Roads & Pavements",
          "Mass concrete and composite deck construction",
          "Floors Without Joints"
        ],
        advantages: [
          "High Tensile strength",
          "Substantially enhance initial crack strength",
          "Continuously provide post crack strength",
          "Increases Speed of construction, overall durability, fatigue resistance and flexural toughness",
          "Save money and time and require less labour",
          "Provides Multi-Dimensional reinforcement",
          "Ultimate load bearing capacity",
          "Stronger joints lower the possibility of maintenance"
        ],
        keyFeatures: [
          "Enhances load-bearing capacity",
          "Prevents cracking and improves durability",
          "Increases impact and fatigue resistance",
          "Minimizes reliance on traditional steel reinforcements",
          "Improves construction efficiency"
        ],
        images: [
          "/images/steel-1.jpg",
          "/images/steel-2.jpg",
          "/images/steel-4.jpg",
          "/images/steel-5.jpg",
          "/images/steel-6.jpg",
          "/images/steel-8.png",
          "/images/steel-9.png"
        ],
        pdfURL: "/pdf/steel-fibre.pdf",
        category: "steel-fibre",
        isActive: true,
        featured: true
      },
      {
        slug: "cellulose-fiber-pellets",
        name: "Cellulose Fiber Pellets",
        bgImage: "/images/antrocel-2.jpg",
        description: "Empowering Stone Matrix Asphalt (SMA) technology in flexible pavements",
        logoImg: [],
        image: "/images/antrocel-2.jpg",
        overview: "<p><b>Cellulose fiber pellets</b> are an innovative additive used in asphalt pavement mixtures to enhance their performance and longevity. These natural fibers are derived from renewable plant-based sources and offer several key benefits when incorporated into asphalt. When cellulose fiber pellets are added to asphalt, they improve the overall stability and durability of the pavement. One of the primary advantages is their ability to reduce binder draindown in <b>Stone Matrix Asphalt</b> Mixes. Rutting is the formation of grooves or depressions on the surface of the road, usually caused by the repetitive stress from vehicle traffic, especially in hot weather. Cellulose fibers help distribute the load more evenly across the surface, reducing the likelihood of permanent deformation.</p><br /><p>About Stone Matrix Asphalt:<b> Stone Matrix Asphalt</b> (SMA) was developed in Germany in 1960s and is considered to be highly rut resistant bituminous course, both for binder and wearing courses, for heavy traffic roads. SMA is a tough, stable and a rut resistant mixture which is based on the concept of coarse aggregate skeleton, achieving stone on stone contact. This skeleton provides strength and durability to SMA and enables it to remain healthy for at least 10 - 12 years. </p>",
        specifications: [
          {
            title: "Natural Cellulose Fibre Content",
            value: "≥ 90%"
          },
          {
            title: "Moisture Content",
            value: "< 5%"
          },
          {
            title: "Ash Content",
            value: "< 20%"
          },
          {
            title: "Compliance",
            value: " IRC SP 79 & MORTH"
          },
          {
            title: "Tested By",
            value: "CRRI, IIT, NITRA, Delhi Test House"
          }
        ],
        application: [
          "Used in asphalt paving for high-performance roads",
          "Enhances the durability of bridge decks and airport runways",
          "Used in waterproofing membranes and soundproofing applications"
        ],
        advantages: [
          "Reduces binder drain-down",
          "Enhances resistance to fatigue cracking",
          "Improves adhesion and overall mixture stability"
        ],
        keyFeatures: [
          "Made from high-quality cellulose fibers",
          "Eco-friendly and sustainable",
          "Easy to mix and apply in asphalt production"
        ],
        images: [
          "/images/antrocel-g.jpg",
          "/images/antrocel-1.jpg",
          "/images/antrocel-2.jpg",
          "/images/antrocel-3.jpg",
          "/images/antrocel-5.jpg",
          "/images/cellulose-fiber-pellet-three.jpg",
          "/images/cellulose-fiber-pellet-seven.jpg"
        ],
        pdfURL: "",
        storage: "To maintain the quality of Cellulose fiber pellets, store them in a cool, dry place, away from direct sunlight and moisture. Handle with care to prevent damage or contamination. Following proper storage and handling guidelines ensures the product's performance integrity when added to asphalt mixtures.",
        category: "cellulose-fibre",
        isActive: true,
        featured: true
      },
      {
        slug: "anti-stripping-agent",
        name: "Anti Stripping Agent",
        bgImage: "/images/anti-stripping-agent-main.jpg",
        description: "Adhesion Promoter for Flexible Pavements",
        logoImg: [],
        image: "/images/anti-stripping-agent-main.jpg",
        overview: "Anti-stripping agents are specialized additives used in asphalt mixtures to enhance adhesion between bitumen and aggregates, preventing moisture-related damage. They improve the durability and performance of pavements by reducing stripping, a phenomenon where water weakens the bond between asphalt and aggregate surfaces. By mitigating the effects of water infiltration, these agents help extend the lifespan of roads, minimize maintenance costs, and ensure structural stability, especially in regions prone to heavy rainfall or fluctuating temperatures. Available in various forms, including organic-based, amine-based, and silane-based formulations, anti-stripping agents play a crucial role in maintaining pavement integrity and long-term performance.",
        specifications: [
          {
            title: "Pack Size",
            value: "20kg Drums; 1000 kg IBC for bulks needs"
          },
          {
            title: "Grade",
            value: "Nanotechnology, Organic Chemistry "
          },
          {
            title: "Appearance",
            value: "Pale Yellow Liquid"
          },
          {
            title: "Recommended Dosage",
            value: "0.05 - 0.1%"
          }
        ],
        application: [
          "Used in hot mix asphalt to prevent stripping",
          "Applied in road construction for improved durability",
          "Enhances performance in extreme weather conditions"
        ],
        advantages: [
          "Improves water resistance",
          "Reduces maintenance costs",
          "Enhances asphalt mixture strength and longevity"
        ],
        keyFeatures: [
          "Chemical and Organic-based formulations available",
          "Enhances adhesion and reduces moisture susceptibility",
          "Compatible with various types of asphalt binders (PMB, CRMB, VG Grades)"
        ],
        images: [
          "/images/anti-stripping-agent-two.jpg",
          "/images/anti-stripping-agent-three.jpg",
          "/images/anti-stripping-agent-four.jpg",
          "/images/anti-stripping-agent-five.jpg",
          "/images/anti-stripping-agent-six.jpg"
        ],
        pdfURL: "",
        category: "anti-stripping",
        isActive: true,
        featured: true
      },
      {
        slug: "silica-fume",
        name: "Silica Fume",
        bgImage: "/images/silica-fume.jpg",
        description: "Enhancing concrete strength and durability with ultra-fine silica.",
        logoImg: ["/images/sillica-fume-logo.jpg"],
        image: "/images/silica-fume.jpg",
        overview: "Corniche Silica Fume is the trusted solution for enhancing the durability and strength of concrete. When added to concrete, Corniche significantly improves its resistance to harmful elements like sulfates, chlorides, and other chemicals that can weaken structures over time. This makes Corniche Silica Fume ideal for a wide range of high-performance concrete applications, including high-rise buildings, bridges, tunnels, and infrastructure projects exposed to harsh environments. <br><br/> By ensuring that concrete remains strong and resilient for decades, Corniche helps in building structures that stand the test of time, making it an essential component for projects demanding long-lasting durability. We focus on delivering a product that enhances the longevity and strength of concrete, improving its resistance to sulfates, chlorides, and other damaging agents. By adding just 5-8% of Silica Fume to concrete, we significantly boost its durability, making it ideal for a variety of construction applications, including high-rise buildings, bridges, tunnels, and underwater concrete.",
        specifications: [
          {
            title: "SiO2 Content",
            value: "> 92%"
          },
          {
            title: "Pack Size",
            value: "25 Kg Bags, 1000 kg Jumbo bags for bulk needs"
          },
          {
            title: "Specific Surface Area",
            value: "15,000 - 30,000 m²/kg"
          },
          {
            title: "Bulk Density",
            value: "200 - 700kg/m³"
          }
        ],
        application: [
          "Used in high-performance concrete for bridges and tunnels",
          "Enhances strength in precast concrete elements",
          "Improves resistance to corrosion in marine structures"
        ],
        advantages: [
          "Increases compressive strength",
          "Enhances durability and resistance to chemical attacks",
          "Reduces permeability and enhances workability"
        ],
        keyFeatures: [
          "Extremely fine particle size for superior performance",
          "Enhances sulfate and chloride resistance",
          "Widely used in high-strength concrete applications"
        ],
        images: [
          "/images/sillica-fume-one.jpg",
          "/images/sillica-fume-four.jpg",
          "/images/sillica-fume-logo.jpg",
          "/images/sillica-fume-six.png",
          "/images/sillica-fume-seven.png"
        ],
        pdfURL: "/pdf/corniche_brochure_digital.pdf",
        category: "silica-fume",
        isActive: true,
        featured: true
      }
    ];

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully inserted ${insertedProducts.length} products into database`);

    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');

  } catch (error) {
    console.error('❌ Error initializing products:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  initializeProducts();
}

module.exports = { initializeProducts };
