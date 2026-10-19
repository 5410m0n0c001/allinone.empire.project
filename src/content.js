// Contenido de los servicios. Fuente: textos del sitio Wix original (_captura/catalogo_site.json),
// corregidos y traducidos al ingles donde estaban en espanol. No se inventan datos ni precios.
// `src` = slug de la pagina original (para tomar sus imagenes/videos de media_map.json).

const CONTACT = {
  name: 'Christian G.',
  phone: '+52 624 137 8636',
  wa: '526241378636',
  email: 'allinonecabo@hotmail.com',
  hours: '7 days a week · 9 am – 7 pm',
  social: {
    instagram: 'https://instagram.com/allinonecabo',
    facebook: 'https://www.facebook.com/allinonecabo/',
    tiktok: 'https://vm.tiktok.com/ZMLxmRR2x/',
    youtube: 'https://www.youtube.com/channel/UCuaTBNTS0HM_6hDBwZix_Fg',
  },
};

const VIDEO_PERKS = [
  ['Best drones on the market', 'We fly DJI drones — the best image quality in the drone market.'],
  ['Photos included', 'Every service includes edited photos, for the same price.'],
  ['Smooth stabilization', 'Gimbals and stabilizers keep every shot smooth and steady.'],
  ['Professional camera crew', 'A specially trained team delivering top-quality video and photos.'],
  ['Cinema-grade editing', 'We edit in DaVinci Resolve, the software used to finish feature films.'],
  ['48-hour delivery', 'We shoot, edit and deliver everything in 48 hours for urgent projects.'],
];

const SERVICES = [
  {
    slug: 'fishing', src: 'fishing', title: 'Sport Fishing', short: 'Fishing',
    eyebrow: 'Marlin capital of the world',
    lead: "Let's go fishing in Cabo San Lucas.",
    body: ['We work with all of the fishing boats in Cabo. Choose a 5-hour or an 8-hour trip, tell us how many are in your group, and we will match you with the right boat for you and your friends or family.'],
    features: ['5-hour trip', '8-hour trip', 'Boats for every group size'],
  },
  {
    slug: 'video-marketing', src: 'videomarketing', title: 'Video Marketing', short: 'Video Marketing',
    eyebrow: 'Film · Photo · Drone',
    lead: 'Would you like your product to shine like a diamond?',
    body: ['Your wedding or event remembered in a unique, creative way. Your vacation turned into a treasured video. Leave it to us — we make sure we capture all of the best moments.', 'Are you a local business? We have affordable memberships.'],
    perks: true,
    testimonial: ['My friends and I had such a fun experience on a yacht we rented! It was really cool to see it on video and we got to show all of my friends and family when I got home from vacation. I only wish we could’ve had the videographers with us during our whole day and night! Thanks, Kurtis and Alex for everything :)', 'Lauren'],
  },
  {
    slug: 'influencer', src: 'influencer', title: 'Influencer Sessions', short: 'Influencer',
    eyebrow: 'Content creators',
    lead: 'Let us show you to the world.',
    body: ['Whether you are promoting a brand or running a special offer, we make sure you and the product are shown with style and grace. We are always looking to partner with influencers for a win-win collaboration.', 'The longer the session, the longer the video: every additional hour adds 30–60 seconds of video plus more photos to the finished project. We can always cut short Instagram edits for you.'],
    packages: [
      { name: 'Influencer session', price: '$249', note: '1-hour session', items: ['1-minute highlights video', '10 photos', '30-second Instagram teaser', '2 camera operators'] },
      { name: 'Additional hour', price: '$149', note: 'per hour', items: ['Before 8 pm', 'Please contact us before booking extra hours'] },
      { name: 'Additional hour after 8 pm', price: '$199', note: 'per hour', items: ['Night shoots', 'Please contact us before booking extra hours'] },
    ],
  },
  {
    slug: 'businesses', src: 'businesses', title: 'Business Campaigns', short: 'Businesses',
    eyebrow: 'Restaurants · Yachts · Hotels',
    lead: 'Whatever business you run, we have you covered.',
    body: ['Your next advertising campaign: we design it with our creativity, capture the footage, edit it and turn it into eye-catching marketing content. Every package includes drone footage, and we size each video for the platforms you use — Instagram, Facebook, YouTube — plus video and images for your website.'],
    packages: [
      { name: 'Basic', note: '1–2 hours', items: ['5 photos', '10-second ad', '20-second ad', '1-minute video'] },
      { name: 'Premier', note: 'Half day', items: ['10 photos', 'Two 10-second ads', 'Two 20-second ads', '1.5-minute video'] },
      { name: 'Exclusive', note: 'Full day', items: ['20 photos', 'Four 10-second ads', 'Four 20-second ads', '2–3 minute video', '5 banner ads'] },
    ],
  },
  {
    slug: 'activities', src: 'activities', title: 'Activities & Tours', short: 'Activities',
    eyebrow: 'Land’s End and beyond',
    lead: "You can't leave Cabo without visiting the famous Land's End Arch!",
    body: ['There are lots of things to do in Cabo: razors, ATVs, camel rides, horseback riding and bicycling — in a mix of mountain, ocean, beach and dune scenery, mostly at Migriño Ranch, home of the second, "not so famous" arch.'],
    sections: [
      ['Camel ride', 'A unique walk you can only do here: a camel ride along the crystal-clear water and majestic waves of the Pacific. Learn about camel history, anatomy, personality and training — get up close, pet and feed them — then try typical tacos with authentic Mexican sauces.'],
      ['Razor desert tour', 'Explore the Baja California Sur desert on a new Polaris vehicle with an experienced local guide: canyons and mountain trails in a secluded natural area, ideal for couples, families and groups. Helmet and face bandana provided. Includes a visit to the second arch of Cabo San Lucas at Rancho San Cristóbal.'],
      ['Whale watching', 'Cabo is one of the best places in the world to watch whales. From December to April, humpback and gray whales visit the warm waters of the Sea of Cortez to mate, give birth and nurse their young. See them by boat, catamaran, kayak or paddleboard.'],
      ['Glass-bottom boat', 'A spectacular view of coral reefs, tropical fish and stingrays on the way to the Arch, with views of the beaches and cliffs of Cabo — and the iconic "Window" rock rising from the sea.'],
    ],
  },
  {
    slug: 'transportation', src: 'transportacion', title: 'Private Transportation', short: 'Transportation',
    eyebrow: 'Airport · Hotel · Anywhere',
    lead: 'Need a ride? We have you covered.',
    body: ['The best way to move around Cabo is in one of our private vehicles. We pick you up anywhere in Cabo San Lucas, San José, La Paz or nearby areas — including airport transportation.'],
    features: ['Suburban', 'Van', 'Limousine', 'Airport transfers'],
  },
  {
    slug: 'helicopter', src: 'helicopter', title: 'Helicopter Rides', short: 'Helicopter',
    eyebrow: '2019 Bell 505',
    lead: 'Discover Cabo San Lucas bay like an eagle.',
    body: ['Fly over Cabo on a helicopter ride with your family — available today. A 2019 Bell 505 meeting the highest standards of service, quality and safety.'],
  },
  {
    slug: 'real-estate', src: 'realestatemenu', title: 'Real Estate & Villas', short: 'Real Estate',
    eyebrow: 'For sale · For rent',
    lead: 'Your gateway to unforgettable getaways.',
    body: ['Dreaming of the perfect vacation? We specialize in luxurious, comfortable houses and villas. Whether you are planning a family retreat, a romantic escape or a gathering of friends, we have the perfect property to make your trip unforgettable.'],
    features: ['Diverse selection', 'Personalized service', 'Quality assurance', 'Prime locations'],
    properties: [
      { name: 'Villa Cecilia · Pedregal', src: 'realestate', kind: 'For rent',
        text: '24-hour security, elevator, private outdoor pool and heated spa, 4 full bathrooms plus a half bath, master and two guest bedrooms plus a casita. Close to the resort restaurant, private beach with seasonal whale watching, spa and an on-site doctor.',
        lists: [
          ['Bedrooms', ['Master: 1 king + couch', 'Guest 1: 1 king', 'Guest 2: 2 queens', 'Casita: 1 king + futon', 'Pull-out couch & air mattress']],
          ['Amenities', ['Full kitchen, 2 dishwashers, grill', 'Wi-Fi, A/C, washer & dryer', 'Smart TVs, Xbox, DVD', 'Balcony, deck, outdoor fireplace', 'Fitness equipment']],
          ['House rules', ['Check-in after 3 pm · check-out before 11 am', 'Max. 10 overnight guests · min. renting age 26', 'Up to 2 dogs under 20 lb, on request', 'No events · no smoking', 'Full refund if cancelled 60+ days before check-in']],
        ] },
      { name: 'Duara Ocean View Villas & Condos', src: 'duara', kind: 'El Tezal',
        text: 'A gated community of 90 condos in El Tezal, one of the highest-valued areas of Cabo San Lucas. Comfort luxury: an effortless blend of luxury with casual tropical living — greet the day with a sunrise from an ocean-view kitchen overlooking the Arch.',
        lists: [
          ['Amenities', ['Concierge & business center', 'Mini market & terraces', 'Fitness area & A/C kids club', 'Adult pool, pool bar & jacuzzi', 'Kids pool, playground, basketball & volleyball']],
          ['Nearby', ['Plaza Novva', 'Trattoria da Pietro', 'Ramen Street', 'Cabo Coffee', 'Cabo Yoga & Fitness']],
        ] },
    ],
  },
  {
    slug: 'wedding-planner', src: 'weddingplanner', title: 'Wedding Planner', short: 'Weddings',
    eyebrow: 'Full planning & design',
    lead: "Let's plan the wedding of your dreams.",
    body: ['From coordination to floral design, we take care of every detail with an international touch and a distinguished style.'],
    features: ['Coordination', 'International touch', 'Distinguished style', 'Furniture selection', 'Theme & decoration', 'Venue', 'Music', 'Flowers & floral design', 'Entertainment'],
  },
  {
    slug: 'restaurants', src: 'restaurants', title: 'Restaurants', short: 'Restaurants',
    eyebrow: 'Where to dine in Cabo',
    lead: 'From tacos to fine gastronomy, Cabo has it all.',
    body: ['Delight your palate with unique Mexican dishes and different cuisines with your family and friends. Ask us for a reservation at our favorites.'],
    features: ['Funky Geisha', 'Confessions', 'Taboo', 'The Office', 'Mango Deck', 'Bagatelle'],
  },
  {
    slug: 'nightclubs', src: 'nightclubs', title: 'Night Clubs', short: 'Night Clubs',
    eyebrow: 'Cabo never sleeps',
    lead: "Let's have some fun.",
    body: ['Come around at night and the show begins — people dancing outside, having fun with no limits. There are lots of options; we will recommend the best ones and make your reservation so you skip the lines.'],
    extraContact: ['Alejandro M.', '+52 744 198 7657'],
  },
  {
    slug: 'events', src: 'events', title: 'Events', short: 'Events',
    eyebrow: 'Birthdays · Concerts · Weddings',
    lead: 'Planning an event? We cover it all.',
    body: ['We can manage any event with our professional team and equipment — your entire production, from film, microphones and floor cameras to drones and more. Call us to turn your idea into reality.'],
  },
  {
    slug: 'bachelor-parties', src: 'bachelorandbacheloretteparties', title: 'Bachelor & Bachelorette Parties', short: 'Private Parties',
    eyebrow: 'Before you tie the knot',
    lead: 'Your ultimate party, on a first-class yacht.',
    body: ['We plan and organize everything: drinks, food, decorations and much more. We also send you digital invitations to share with your friends — and give you a FREE video of your event!'],
    features: ['Luxury yacht', 'Drinks & food', 'Decorations', 'Digital invitations', 'Free event video'],
  },
  {
    slug: 'golf', src: 'golf', title: 'Golf Rounds', short: 'Golf',
    eyebrow: 'Cabo San Lucas Country Club',
    lead: 'One of the most challenging and stunning courses on the peninsula.',
    body: ['The Roy and Matt Dye-designed course sits where the Sea of Cortez meets the Pacific and the untouched desert descends into emerald water, with views of Land’s End and San Lucas Bay. Formerly the Raven Golf Club, the 18-hole championship course has gently sloping fairways, more than 80 bunkers and, at 610 yards, one of the longest holes in Mexico. Reserve your tee time today.'],
    packages: [
      { name: 'Birdie', price: '590 MXN', note: 'Favorite', items: ['Nachos with flank steak', '6 drinks (beer, soda or lemonade)', '2 baskets of golf balls'] },
      { name: 'Finnegan', price: '485 MXN', note: 'To keep up', items: ['6 national beers', '1 basket of golf balls'] },
      { name: 'Eagle', price: '350 MXN', note: 'To share', items: ['4 flank-steak quesadillas', '2 drinks', '1 basket of golf balls'] },
      { name: 'Foursome', price: '685 MXN', note: 'Favorite', items: ['2 pizzas', '4 drinks', 'Bag of 100 balls'] },
      { name: 'Hole in One', price: '640 MXN', note: 'To share', items: ['10 buffalo wings', '6 national beers', '2 bags of balls'] },
      { name: 'Scramble', price: '655 MXN', note: 'To keep up', items: ['Nachos with flank steak', '2 bags of balls'] },
    ],
  },
];

module.exports = { CONTACT, VIDEO_PERKS, SERVICES };
