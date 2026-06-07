import mongoose from "mongoose";
import dotenv from 'dotenv';
import Package from "./models/Package.js";

dotenv.config();

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const data = [
        {
            name: "Mount Bromo Sunrise Trek",
            price: 256,
            destination: "Indonesia",
            images: [
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
                'https://images.unsplash.com/photo-1749731630653-d9b3f00573ed?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1610800035926-e69304dd6f54?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                "https://images.unsplash.com/photo-1571497724873-9f5a06e532bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1646913291987-f455ab5f32e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1679109426640-966f09b70c88?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1679329103267-624f9775f317?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1565619109666-b8bfe0e95ceb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1505966309334-54eb8f9e3c48?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1722016145515-b0ca4961e18f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJyb21vfGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1518043610038-064362b44076?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1723407877285-584e2d0053ab?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],
            duration: "3 Days",
            maxTraveler: 4,
            departureDate: [
                { date: new Date("2026-06-15"), slots: 10 },
                { date: new Date("2026-07-22"), slots: 4 },
                { date: new Date("2026-08-11"), slots: 14 },
            ],
            description: "Experience the breathtaking sunrise over Mount Bromo, one of Indonesia's most active volcanoes. Trek through a sea of sand, witness golden skies, and feel the raw power of nature on this unforgettable volcanic adventure.",
            included: [
                { title: "Expert Guide", detail: "Professional English-speaking local mountaineer guide." },
                { title: "Hotel Stay", detail: "2 nights in a cozy mountain lodge near the crater rim." },
                { title: "Jeep Transfer", detail: "4x4 continuous private transport for sunrise viewpoints." },
                { title: "Breakfast", detail: "Freshly prepared traditional local breakfast sets daily." }
            ],
            itinerary: [
                { days: "Day 1", location: "Surabaya", description: "Arrival and transfer to hotel near Bromo. Evening briefing and rest." },
                { days: "Day 2", location: "Mount Bromo", description: "Pre-dawn jeep ride to viewpoint. Watch the sunrise, trek to the crater rim." },
                { days: "Day 3", location: "Surabaya", description: "Morning free time, transfer back to Surabaya for departure." }
            ]
        },
        {
            name: "Bali Rice Terrace Escape",
            price: 200,
            destination: "Indonesia",
            images: ['https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80'],
            duration: "5 Days",
            maxTraveler: 3,
            departureDate: [
                { date: new Date("2026-06-18"), slots: 6 },
                { date: new Date("2026-07-05"), slots: 12 },
                { date: new Date("2026-08-20"), slots: 9 },
            ],
            description: "Immerse yourself in Bali's lush green rice terraces, ancient temples, and vibrant culture. From Ubud's artistic heart to Tegallalang's iconic terraces, this trip is a feast for the senses.",
            included: [
                { title: "Villa Stay", detail: "4 nights in a private luxury pool villa situated in Ubud." },
                { title: "Daily Breakfast", detail: "Floating breakfast and organic tropical fruit options." },
                { title: "Temple Tours", detail: "Skip-the-line entrance fees to all scheduled sacred sites." },
                { title: "Driver", detail: "Dedicated English-speaking private driver with an AC vehicle." }
            ],
            itinerary: [
                { days: "Day 1", location: "Denpasar", description: "Arrival, transfer to Ubud villa, welcome dinner." },
                { days: "Days 2-3", location: "Ubud", description: "Visit Tegallalang rice terraces, Tirta Empul temple, local art markets." },
                { days: "Days 4-5", location: "Seminyak", description: "Beach time, sunset at Tanah Lot temple, departure." }
            ]
        },
        {
            name: "Kashmir Valley Explorer",
            price: 256,
            destination: "India",
            images: ['https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80'],
            duration: "7 Days",
            maxTraveler: 2,
            departureDate: [
                { date: new Date("2026-07-01"), slots: 5 },
                { date: new Date("2026-07-25"), slots: 8 },
                { date: new Date("2026-09-10"), slots: 12 },
            ],
            description: "Discover the paradise on earth — Kashmir. From serene Dal Lake houseboats to snow-capped Gulmarg meadows, this journey through India's most beautiful valley will leave you speechless.",
            included: [
                { title: "Houseboat Stay", detail: "Traditional hand-carved cedar luxury houseboat experience." },
                { title: "Shikara Ride", detail: "Sunset and morning floating market boat excursions." },
                { title: "Guide", detail: "Certified regional expert for treks and cultural insights." },
                { title: "All Meals", detail: "Authentic multi-course Kashmiri Wazwan and daily dining." }
            ],
            itinerary: [
                { days: "Days 1-2", location: "Srinagar", description: "Arrive, check into houseboat on Dal Lake, Shikara ride at sunset." },
                { days: "Days 3-4", location: "Gulmarg", description: "Gondola ride, meadow walks, snow activities." },
                { days: "Days 5-6", location: "Pahalgam", description: "Valley of shepherds, Betaab Valley, Aru Valley trek." },
                { days: "Day 7", location: "Srinagar", description: "Local market shopping, departure." }
            ]
        },
        {
            name: "Maldives Overwater Retreat",
            price: 700,
            destination: "Maldives",
            images: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80'],
            duration: "4 Days",
            maxTraveler: 4,
            departureDate: [
                { date: new Date("2026-06-10"), slots: 15 },
                { date: new Date("2026-08-02"), slots: 7 },
                { date: new Date("2026-10-05"), slots: 20 },
            ],
            description: "Escape to the crystal-clear waters of the Maldives. Stay in a luxurious overwater bungalow, snorkel with manta rays, and watch the most stunning sunsets on earth.",
            included: [
                { title: "Overwater Bungalow", detail: "Premium ocean-view villa with direct lagoon access ladder." },
                { title: "Seaplane Transfer", detail: "Round-trip scenic flight transfers from Velana Airport." },
                { title: "Snorkeling Gear", detail: "Complimentary rental of high-end fins, masks, and vests." },
                { title: "Full Board", detail: "All-inclusive gourmet buffet lunches and fine dining dinners." }
            ],
            itinerary: [
                { days: "Day 1", location: "Male Atoll", description: "Seaplane transfer to resort, welcome drinks, sunset cruise." },
                { days: "Days 2-3", location: "Private Island", description: "Snorkeling, dolphin watching, spa, beach dining." },
                { days: "Day 4", location: "Male", description: "Morning swim, transfer back to Male for departure." }
            ]
        },
        {
            name: "Santorini Sunset Cruise",
            price: 850,
            destination: "Greece",
            images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80'],
            duration: "5 Days",
            maxTraveler: 6,
            departureDate: [
                { date: new Date("2026-07-04"), slots: 11 },
                { date: new Date("2026-07-18"), slots: 16 },
                { date: new Date("2026-08-25"), slots: 6 },
            ],
            description: "Sail through the volcanic caldera of Santorini, explore whitewashed villages perched on cliffs, and experience the most famous sunset in the world from Oia.",
            included: [
                { title: "Hotel Stay", detail: "Boutique cliffside hotel featuring classic Cycladic architecture." },
                { title: "Sunset Cruise", detail: "Catamaran sailing with open bar and freshly grilled dinner." },
                { title: "Wine Tasting", detail: "Sommelier-guided tour of 3 historic volcanic vineyards." },
                { title: "Airport Transfer", detail: "Private van pickup and drop-off directly to your hotel." }
            ],
            itinerary: [
                { days: "Day 1", location: "Fira", description: "Arrive in Santorini, check in, explore Fira town." },
                { days: "Days 2-3", location: "Oia", description: "Caldera hike, sunset at Oia castle, local cuisine tour." },
                { days: "Days 4-5", location: "Akrotiri", description: "Ancient ruins visit, red beach, sunset cruise, departure." }
            ]
        },
        {
            name: "Patagonia Wilderness Trek",
            price: 1200,
            destination: "Argentina",
            images: ['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80'],
            duration: "10 Days",
            maxTraveler: 3,
            departureDate: [
                { date: new Date("2026-08-08"), slots: 8 },
                { date: new Date("2026-09-12"), slots: 15 },
                { date: new Date("2026-10-01"), slots: 5 },
            ],
            description: "Trek through one of the world's last true wildernesses. Massive glaciers, jagged peaks, and untouched landscapes make Patagonia a bucket-list destination for every serious adventurer.",
            included: [
                { title: "Expert Guide", detail: "UIAGM-certified high-mountain trekking guides." },
                { title: "Camping Gear", detail: "All-weather tents, thermal sleeping bags, and mats." },
                { title: "All Meals", detail: "High-calorie backcountry meals curated for trail trekking." },
                { title: "Park Fees", detail: "Full permits for Torres del Paine and Los Glaciares." }
            ],
            itinerary: [
                { days: "Days 1-2", location: "Buenos Aires", description: "Arrive, city tour, fly to Punta Arenas." },
                { days: "Days 3-6", location: "Torres del Paine", description: "W Trek — Base of Towers, French Valley, Grey Glacier." },
                { days: "Days 7-9", location: "El Calafate", description: "Perito Moreno Glacier trek and boat tour." },
                { days: "Day 10", location: "Buenos Aires", description: "Return flight, farewell dinner, departure." }
            ]
        },
        {
            name: "Kyoto Cherry Blossom Tour",
            price: 650,
            destination: "Japan",
            images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80'],
            duration: "6 Days",
            maxTraveler: 5,
            departureDate: [
                { date: new Date("2026-04-05"), slots: 18 },
                { date: new Date("2026-04-15"), slots: 22 },
                { date: new Date("2026-04-28"), slots: 14 },
            ],
            description: "Walk under canopies of pink cherry blossoms in ancient Kyoto. Visit centuries-old temples, participate in a traditional tea ceremony, and experience Japan at its most magical.",
            included: [
                { title: "Ryokan Stay", detail: "Traditional inn lodging featuring hot springs (onsen) access." },
                { title: "Bullet Train Pass", detail: "7-Day ordinary JR pass covering Tokyo-Kyoto-Osaka lines." },
                { title: "Tea Ceremony", detail: "Private session led by a licensed tea master in Gion." },
                { title: "Guide", detail: "Local cultural guide fluent in English and Japanese heritage." }
            ],
            itinerary: [
                { days: "Days 1-2", location: "Tokyo", description: "Arrive in Tokyo, Shinjuku and Shibuya exploration." },
                { days: "Days 3-5", location: "Kyoto", description: "Bullet train to Kyoto, Fushimi Inari, Arashiyama bamboo grove, tea ceremony." },
                { days: "Day 6", location: "Osaka", description: "Day trip to Osaka, Dotonbori street food, departure." }
            ]
        },
        {
            name: "Sahara Desert Adventure",
            price: 480,
            destination: "Morocco",
            images: ['https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80'],
            duration: "4 Days",
            maxTraveler: 8,
            departureDate: [
                { date: new Date("2026-09-02"), slots: 24 },
                { date: new Date("2026-10-14"), slots: 11 },
                { date: new Date("2026-11-03"), slots: 30 },
            ],
            description: "Ride camels into the golden dunes of the Sahara, sleep under a blanket of stars in a luxury desert camp, and explore the ancient medinas and kasbahs of Morocco.",
            included: [
                { title: "Riad Stay", detail: "Courtyard oasis hotel in Marrakech featuring Morrocan tiling." },
                { title: "Camel Trek", detail: "Guided sunset caravan ride deep into Erg Chebbi dunes." },
                { title: "Desert Camp", detail: "Glamping setup with private ensuite bathrooms and bedding." },
                { title: "All Meals", detail: "Traditional tagines, couscous, and fire-baked Berber bread." }
            ],
            itinerary: [
                { days: "Day 1", location: "Marrakech", description: "Arrive, explore Djemaa el-Fna square, riad check-in." },
                { days: "Day 2", location: "Merzouga", description: "Drive through Atlas Mountains and kasbahs to the Sahara." },
                { days: "Days 3-4", location: "Sahara", description: "Camel trek into dunes, overnight luxury camp, stargazing, return." }
            ]
        },
        {
            name: "Amalfi Coast Drive",
            price: 920,
            destination: "Italy",
            images: ['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80'],
            duration: "7 Days",
            maxTraveler: 4,
            departureDate: [
                { date: new Date("2026-06-20"), slots: 5 },
                { date: new Date("2026-07-12"), slots: 8 },
                { date: new Date("2026-08-01"), slots: 12 },
            ],
            description: "Drive the world's most scenic coastal road, stopping at clifftop villages, hidden beaches, and centuries-old lemon groves. The Amalfi Coast is Italy at its most dramatic and beautiful.",
            included: [
                { title: "Boutique Hotel", detail: "Clifftop lodging overlooking the Tyrrhenian Sea." },
                { title: "Car Rental", detail: "Premium convertible or compact car with manual/auto gearbox." },
                { title: "Boat Tour", detail: "Private coastal skip-stop cruise encompassing Capri island." },
                { title: "Wine Tasting", detail: "Aged Limoncello and vintage blend tasting in Ravello." }
            ],
            itinerary: [
                { days: "Days 1-2", location: "Naples", description: "Arrive, explore Naples, visit Pompeii ruins." },
                { days: "Days 3-4", location: "Positano", description: "Scenic drive, Positano beach, cliffside dining." },
                { days: "Days 5-6", location: "Amalfi & Ravello", description: "Boat tour of grottos, Ravello gardens, limoncello tasting." },
                { days: "Day 7", location: "Naples", description: "Return to Naples, departure." }
            ]
        },
        {
            name: "Northern Lights Explorer",
            price: 1100,
            destination: "Iceland",
            images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80'],
            duration: "5 Days",
            maxTraveler: 6,
            departureDate: [
                { date: new Date("2026-11-05"), slots: 16 },
                { date: new Date("2026-12-01"), slots: 25 },
                { date: new Date("2027-01-10"), slots: 14 },
            ],
            description: "Chase the aurora borealis across Iceland's volcanic landscapes. From thundering waterfalls to geothermal hot springs, Iceland in winter is an otherworldly experience unlike anything else on earth.",
            included: [
                { title: "Hotel Stay", detail: "Modern eco-lodges optimized away from urban light pollution." },
                { title: "Northern Lights Tour", detail: "Guided nighttime photography hunting excursions." },
                { title: "Blue Lagoon", detail: "Premium comfort tier entrance ticket with mask and a drink." },
                { title: "Airport Transfer", detail: "FlyBus scheduled terminal shuttles right to the hotel doors." }
            ],
            itinerary: [
                { days: "Day 1", location: "Reykjavik", description: "Arrive, city tour, Northern Lights forecast briefing." },
                { days: "Days 2-3", location: "Golden Circle", description: "Geysir, Gullfoss waterfall, Thingvellir National Park." },
                { days: "Days 4-5", location: "South Coast", description: "Black sand beach, Jokulsarlon glacier lagoon, Blue Lagoon, departure." }
            ]
        }
    ];

    await Package.deleteMany();
    await Package.insertMany(data);

    mongoose.disconnect();
    console.log("Done");
};

seed();