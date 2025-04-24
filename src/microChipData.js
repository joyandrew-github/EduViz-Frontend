export const microchipData = {
    name: 'Microchip',
    ms:25687.5,
    fullviewModel: "67f8009368b0149167b198e6", // Example fullview model ID (replace with actual ID)
    parts: {
        transistorLayer: {
            modelId: "67fd48276b85f29928bd27ff", // Example model ID (replace with actual ID)
            name: "Transistor Layer",
            description: "The foundational active region of the microchip, consisting of billions of transistors etched onto a silicon wafer using advanced photolithography techniques. Each transistor, comprising a source, drain, and gate, is precisely engineered at nanoscale dimensions to execute logic and arithmetic operations efficiently.",
            usage: "Serves as the computational heart of the microchip, enabling all logical processing, data manipulation, and execution of instructions for applications ranging from simple calculations to complex AI algorithms."
        },
        gateOxide: {
            modelId: "67fd48a26b85f29928bd28f4", // Example model ID (replace with actual ID)
            name: "Gate Oxide",
            description: "An ultra-thin insulating layer, typically made of silicon dioxide (SiO₂) or high-k dielectrics like hafnium oxide, deposited between the transistor’s silicon substrate and gate. This layer, often only a few nanometers thick, ensures electrical isolation while allowing precise control of electron flow through the transistor channel.",
            usage: "Facilitates reliable and rapid switching of transistors by acting as a dielectric barrier, critical for maintaining performance and minimizing power leakage in modern microchip designs."
        },
        polysiliconGate: {
            modelId: "67fd494c6b85f29928bd2c63", // Example model ID (replace with actual ID)
            name: "Polysilicon Gate",
            description: "A conductive layer made of polycrystalline silicon, doped with impurities like phosphorus or boron to enhance conductivity. Deposited atop the gate oxide, it forms the control electrode of each transistor, shaping the electric field that governs current flow between source and drain.",
            usage: "Regulates the operation of transistors by modulating the channel beneath the gate oxide, enabling the microchip to perform binary operations and switch states at high speeds."
        },
        metalLayers: {
            modelId: "67fd49336b85f29928bd2bb4", // Example model ID (replace with actual ID)
            name: "Metal Layers (M1, M4, M8)",
            description: "A hierarchical stack of copper or aluminum interconnects, including Metal 1 (M1) for local connections, Metal 4 (M4) for intermediate routing, and Metal 8 (M8) for global interconnects. These layers are fabricated using dual-damascene processes, with dielectric insulation between them to prevent crosstalk and ensure signal integrity.",
            usage: "Provides the electrical pathways that link transistors into functional circuits, distributing power and signals across the microchip to support complex operations and high-speed communication."
        },
        higherMetal: {
            modelId: "67fd49136b85f29928bd2b03", // Example model ID (replace with actual ID)
            name: "Higher Metal",
            description: "An additional upper-level metal layer, typically copper-based, positioned above the primary metal stack (e.g., M9 or higher in advanced nodes). Fabricated with wider traces and thicker insulation, it’s designed for long-distance signal transmission or high-current power delivery, often using specialized lithography and etching techniques.",
            usage: "Enhances the microchip's performance by optimizing power distribution and supporting efficient signal routing over longer distances, crucial for large-scale integrated circuits."
        },
        passivationLayer: {
            modelId: "67fd48eb6b85f29928bd2a52", // Example model ID (replace with actual ID)
            name: "Passivation Layer",
            description: "A robust protective coating, typically composed of silicon nitride (Si₃N₄) or silicon oxide, deposited over the microchip’s surface via chemical vapor deposition (CVD). This layer shields the delicate internal structures from moisture, dust, and mechanical stress, while openings are etched to expose bonding pads.",
            usage: "Ensures long-term reliability and durability of the microchip by safeguarding it against environmental degradation, corrosion, and physical damage during packaging and operation."
        },
        bondingPads: {
            modelId: "67fd48c96b85f29928bd29a3", // Example model ID (replace with actual ID)
            name: "Bonding Pads",
            description: "Metallic contact points, usually made of gold, aluminum, or copper, strategically placed on the microchip’s surface. These pads, often coated with a thin anti-oxidation layer, serve as the interface for wire bonding or flip-chip soldering, connecting the chip to its package or external circuitry.",
            usage: "Enables the microchip to interface with the outside world, facilitating power input, signal output, and integration into larger electronic systems like motherboards or modules."
        }
    }
};