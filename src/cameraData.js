export const cameraData = {
    name: 'Camera',
    ms: 20833.33,
    fullviewModel: "67fdd5a5c7479580cf5775f5", // Example fullview model ID (replace with actual ID)
    parts: {
        lensMount: {
            modelId: "67fdd7d5c7479580cf577a0a", // Example model ID (replace with actual ID)
            name: "Lens Mount",
            description: "A precisely engineered mechanical interface, typically crafted from durable materials such as stainless steel, brass, or high-strength polycarbonate, designed to securely attach the camera lens to the camera body. This component features alignment pins, a locking mechanism (often a bayonet or thread system), and electrical contacts (in modern systems) to ensure precise optical alignment, electrical communication between lens and body, and long-term stability under various environmental conditions like vibration or temperature changes.",
            usage: "Facilitates the attachment and removal of interchangeable lenses, allowing photographers to switch between wide-angle, telephoto, macro, or other specialized lenses with ease. It maintains a stable and accurate connection, ensuring optimal image quality by aligning the lens with the sensor plane, and supports advanced features like autofocus and image stabilization through integrated electrical interfaces."
        },
        cameraLens: {
            modelId: "67fdd6c9c7479580cf57785b", // Example model ID (replace with actual ID)
            name: "Camera Lens",
            description: "An intricate optical assembly composed of multiple glass or high-quality plastic elements, meticulously arranged in groups to focus incoming light onto the camera sensor with precision. These elements are often coated with anti-reflective layers to minimize glare, ghosting, and lens flare, and are designed with specific focal lengths (e.g., 24mm, 50mm, 200mm) and maximum apertures (e.g., f/1.8, f/2.8) to cater to diverse photographic needs, from portraits to landscapes. The lens housing is typically made of lightweight yet robust materials to withstand regular use.",
            usage: "Captures and focuses light from the scene onto the sensor to form a detailed and sharp image, enabling photographers to control depth of field, zoom range, and perspective. It is essential for creative photography, supporting techniques like bokeh effects, macro photography, and telephoto shots, while also adapting to various lighting conditions through its aperture and coating technology."
        },
        viewfinder: {
            modelId: "67fdd7f1c7479580cf577a61", // Example model ID (replace with actual ID)
            name: "Viewfinder",
            description: "An essential optical or electronic device that provides photographers with a real-time preview of the scene to be captured. Optical viewfinders utilize a pentaprism or pentamirror system combined with mirrors to reflect light from the lens to the eye, offering a direct view through the lens (TTL). Electronic viewfinders (EVFs), on the other hand, display a digital feed from the sensor on a small high-resolution screen, often with overlays for settings and focus peaking. Both types are designed for ergonomic viewing and can be adjusted for diopter correction.",
            usage: "Allows photographers to compose shots accurately, adjust focus manually or automatically, and preview exposure settings in real time before capturing the image. It aids in achieving precise framing, especially in challenging lighting conditions, and supports advanced features like histogram display or focus magnification, enhancing both professional and amateur photography workflows."
        },
        bodyFrame: {
            modelId: "67fdd6aac7479580cf577783", // Example model ID (replace with actual ID)
            name: "Body Frame",
            description: "The structural chassis of the camera, typically constructed from lightweight yet durable materials such as magnesium alloy, aluminum, or reinforced polycarbonate, designed to house and protect critical internal components including the sensor, lens mount, shutter mechanism, and electronic circuitry. This frame is engineered to provide rigidity, resist deformation under pressure, and offer weather sealing in high-end models to protect against dust, moisture, and extreme temperatures, ensuring longevity and reliability in diverse shooting environments.",
            usage: "Serves as the foundational structure that securely holds all camera components in place, ensuring alignment and stability during operation. It protects sensitive electronics from physical damage and environmental factors, while also providing mounting points for accessories like grips, straps, and external flashes, making it indispensable for both portable and rugged use across various climates and conditions."
        },
        lcdScreen: {
            modelId: "67fdd837c7479580cf577ab8", // Example model ID (replace with actual ID)
            name: "LCD Screen",
            description: "A high-resolution liquid crystal display panel mounted on the camera’s rear, designed to serve multiple functions including image review, menu navigation, and, in some models, acting as an electronic viewfinder. This screen typically features touch-sensitive capabilities for intuitive control, adjustable brightness and color settings for visibility in various lighting conditions (from bright sunlight to dim interiors), and a protective coating or cover glass to resist scratches, impacts, and smudges. Advanced models may include articulated or tilting designs for flexible shooting angles and enhanced accessibility.",
            usage: "Enables photographers to review captured images and videos with detailed playback options, navigate complex camera menus for settings adjustments, and use live view for composition and focusing. It enhances user interaction by supporting touch controls, live histogram displays, and real-time exposure previews, making it a critical tool for post-capture analysis, on-the-fly shooting adjustments, and creative angle exploration."
        },
        apertureRings: {
            modelId: "67fdd66cc7479580cf577701", // Example model ID (replace with actual ID)
            name: "Aperture Rings",
            description: "A series of overlapping, precisely engineered metal or composite blades housed within the lens assembly, designed to form a variable circular opening that controls the amount of light entering the camera. These rings are actuated manually via a physical ring on the lens or electronically through camera controls and are calibrated to adjust the aperture size (e.g., f/2.8 to f/22) with fine increments, influencing both exposure and depth of field. The blades are coated with lubricants and anti-wear materials to ensure smooth operation and longevity over thousands of cycles.",
            usage: "Regulates the intensity of light reaching the sensor, allowing photographers to control exposure settings and achieve creative effects such as shallow depth of field for portraits or wide depth of field for landscapes. It also plays a key role in managing motion blur by interacting with shutter speed, making it essential for diverse photographic scenarios, including fast-action sports and long-exposure night photography."
        },
        cameraShutter: {
            modelId: "67fdd775c7479580cf57798a", // Example model ID (replace with actual ID)
            name: "Camera Shutter",
            description: "A critical mechanical or electronic mechanism that controls the duration of light exposure on the sensor by opening and closing to capture an image. Mechanical shutters consist of fast-moving blades made from lightweight materials like titanium or carbon fiber, capable of speeds from 1/8000th of a second to several seconds, with durability to withstand repeated use. Electronic shutters use sensor-based technology for silent operation and even higher speeds (up to 1/32000th of a second), often found in mirrorless cameras, eliminating mechanical wear while supporting high-speed video and stills.",
            usage: "Determines the exposure time, enabling the capture of fast-moving subjects (e.g., sports or wildlife) with short shutter speeds or long-exposure effects (e.g., star trails or light painting) with extended durations. It works in tandem with the aperture and ISO to achieve proper exposure, making it a cornerstone of creative and technical photography across a wide range of genres and conditions."
        },
        cameraSensor: {
            modelId: "67fdd730c7479580cf577933", // Example model ID (replace with actual ID)
            name: "Camera Sensor",
            description: "A sophisticated semiconductor device, typically a CMOS (Complementary Metal-Oxide-Semiconductor) or CCD (Charge-Coupled Device), that converts light into electrical signals to create a digital image. This sensor is composed of millions or billions of photosites (pixels), each capable of capturing light intensity and, in some cases, color through a Bayer filter array or advanced stacked designs. Advanced sensors include features like back-illumination for improved low-light performance, dual-pixel autofocus for rapid focusing, and high dynamic range (HDR) capabilities for capturing details in shadows and highlights, all housed in a light-tight chamber with anti-reflective coatings.",
            usage: "Forms the core of the camera’s imaging system by capturing the light focused by the lens and converting it into a digital image, determining resolution, color accuracy, low-light sensitivity, and dynamic range. It supports features like 4K/8K video recording, high-speed burst shooting, advanced autofocus tracking, and computational photography techniques, making it vital for both still photography and cinematography in professional and consumer applications."
        },
        flashHousing: {
            modelId: "67fdd864c7479580cf577b3f", // Example model ID (replace with actual ID)
            name: "Flash Housing",
            description: "A specialized compartment or mounting structure, often integrated into the camera body or designed as an accessory mount, crafted from heat-resistant and impact-durable materials like reinforced plastic, aluminum, or magnesium alloy. This housing provides structural support for an internal or external flash unit, includes electrical contacts for power and synchronization with the camera’s shutter, and is engineered to dissipate heat generated during prolonged use while maintaining precise alignment with the optical axis. It may also feature weather sealing in professional models to protect against environmental exposure.",
            usage: "Supports and positions the flash unit to provide additional illumination in low-light conditions or to serve as fill light in bright settings with harsh shadows, enhancing image quality and exposure balance. It enables synchronization with the shutter for optimal flash timing and accommodates external flash systems or multiple units for advanced lighting setups, making it essential for professional portraiture, event photography, and creative lighting experiments."
        }
    }
};