// ShelfTalk Curated Seed Data
// 16 Celebrated Titles, 15 Author Profiles, 40 Seed Reviews, Reading Circles & Chapter Threads

export const INITIAL_AUTHORS = [
  {
    id: "author-1",
    name: "Matt Haig",
    portraitUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400",
    biography: "Matt Haig is a British novelist and journalist. He has written both fiction and non-fiction for children and adults. His work often explores themes of mental health, second chances, and existential wonder.",
    celebratedWorks: ["The Midnight Library", "How to Stop Time", "Reasons to Stay Alive", "The Humans"],
    awards: ["Winner of the Goodreads Choice Award for Best Fiction", "Books Are My Bag Readers Award", "Yorkshire Post Book Award"]
  },
  {
    id: "author-2",
    name: "Andy Weir",
    portraitUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    biography: "Andy Weir was first a software engineer before writing bestselling science fiction novels grounded in rigorous scientific accuracy, infectious optimism, and problem-solving grit.",
    celebratedWorks: ["Project Hail Mary", "The Martian", "Artemis"],
    awards: ["Goodreads Choice Award for Best Sci-Fi", "Astounding Award for Best New Writer", "Audie Award for Book of the Year"]
  },
  {
    id: "author-3",
    name: "James Clear",
    portraitUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    biography: "James Clear is a writer and speaker focused on habits, decision-making, and continuous improvement. His work has appeared in The New York Times, Forbes, and Business Insider.",
    celebratedWorks: ["Atomic Habits"],
    awards: ["#1 New York Times Bestseller", "Over 15 Million Copies Sold Worldwide", "Audible Most Listened Book"]
  },
  {
    id: "author-4",
    name: "Frank Herbert",
    portraitUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    biography: "Frank Herbert was an acclaimed American science fiction writer best known for the 1965 novel Dune and its five sequels, creating one of the most richly developed universes in speculative fiction.",
    celebratedWorks: ["Dune", "Dune Messiah", "Children of Dune"],
    awards: ["Hugo Award for Best Novel", "Inaugural Nebula Award for Best Novel", "Science Fiction Hall of Fame Inductee"]
  },
  {
    id: "author-5",
    name: "Kazuo Ishiguro",
    portraitUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    biography: "Sir Kazuo Ishiguro is a British novelist, screenwriter, and Nobel laureate whose delicate, introspective novels examine memory, time, duty, and artificial humanity.",
    celebratedWorks: ["Klara and the Sun", "Never Let Me Go", "The Remains of the Day"],
    awards: ["Nobel Prize in Literature (2017)", "Man Booker Prize for Fiction", "Knight Bachelor for Services to Literature"]
  },
  {
    id: "author-6",
    name: "Gabrielle Zevin",
    portraitUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    biography: "Gabrielle Zevin is an internationally bestselling American author and screenwriter whose novels explore friendship, creative collaboration, and video game artistry.",
    celebratedWorks: ["Tomorrow, and Tomorrow, and Tomorrow", "The Storied Life of A.J. Fikry"],
    awards: ["Goodreads Choice Award for Best Fiction", "Indie Next Pick #1", "New York Times Notable Book of the Year"]
  },
  {
    id: "author-7",
    name: "Madeline Miller",
    portraitUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    biography: "Madeline Miller is an American novelist and classical scholar who reimagines ancient Greek mythology with profound emotional depth, lyrical prose, and modern sensitivity.",
    celebratedWorks: ["The Song of Achilles", "Circe", "Galatea"],
    awards: ["Orange Prize for Fiction", "Goodreads Choice Award for Best Fantasy", "Mythopoeic Award Finalist"]
  },
  {
    id: "author-8",
    name: "Yuval Noah Harari",
    portraitUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400",
    biography: "Yuval Noah Harari is an Israeli historian, philosopher, and professor in the Department of History at the Hebrew University of Jerusalem, known for synthesizing broad macro-historical patterns.",
    celebratedWorks: ["Sapiens: A Brief History of Humankind", "Homo Deus", "21 Lessons for the 21st Century"],
    awards: ["Polonsky Prize for Creativity and Originality", "Wenjin Book Award", "Global Thinkers Top 100"]
  },
  {
    id: "author-9",
    name: "Daniel Kahneman",
    portraitUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    biography: "Daniel Kahneman was an Israeli-American psychologist and behavioral economist recognized for his pioneering work on the psychology of judgment and decision-making.",
    celebratedWorks: ["Thinking, Fast and Slow", "Noise: A Flaw in Human Judgment"],
    awards: ["Nobel Memorial Prize in Economic Sciences", "Presidential Medal of Freedom", "Talisman Award"]
  },
  {
    id: "author-10",
    name: "Tara Westover",
    portraitUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    biography: "Tara Westover is an American memoirist and historian. Born to survivalist parents in rural Idaho, she did not enter a classroom until age seventeen before earning a PhD from Cambridge University.",
    celebratedWorks: ["Educated"],
    awards: ["Los Angeles Times Book Prize", "National Book Critics Circle Award Finalist", "Time 100 Most Influential People"]
  },
  {
    id: "author-11",
    name: "Walter Isaacson",
    portraitUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
    biography: "Walter Isaacson is an American biographer, journalist, and professor. He has served as CEO of the Aspen Institute and Chairman of CNN.",
    celebratedWorks: ["Steve Jobs", "Leonardo da Vinci", "Einstein: His Life and Universe", "Elon Musk"],
    awards: ["Gerald Loeb Award", "National Humanities Medal", "Benjamin Franklin Award"]
  },
  {
    id: "author-12",
    name: "Trevor Noah",
    portraitUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400",
    biography: "Trevor Noah is a South African comedian, writer, and former host of The Daily Show. His memoir recounts growing up under apartheid in South Africa.",
    celebratedWorks: ["Born a Crime: Stories from a South African Childhood"],
    awards: ["NAACP Image Award for Outstanding Literary Work", "Thurber Prize for American Humor", "Audie Award for Audiobook of the Year"]
  },
  {
    id: "author-13",
    name: "Barack Obama",
    portraitUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400",
    biography: "Barack Obama served as the 44th President of the United States. He is the author of three bestselling memoirs recounting his childhood, political rise, and presidency.",
    celebratedWorks: ["A Promised Land", "Dreams from My Father", "The Audacity of Hope"],
    awards: ["Nobel Peace Prize (2009)", "Grammy Award for Best Spoken Word Album (x2)", "NAACP Chairman's Award"]
  },
  {
    id: "author-14",
    name: "William Gibson",
    portraitUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    biography: "William Gibson is an American-Canadian speculative fiction novelist widely credited with pioneering the cyberpunk subgenre and coining the term 'cyberspace'.",
    celebratedWorks: ["Neuromancer", "Count Zero", "Mona Lisa Overdrive", "The Peripheral"],
    awards: ["Hugo Award for Best Novel", "Nebula Award for Best Novel", "Philip K. Dick Award"]
  },
  {
    id: "author-15",
    name: "Isaac Asimov",
    portraitUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    biography: "Isaac Asimov was an American writer and biochemist, considered one of the 'Big Three' science fiction masters alongside Arthur C. Clarke and Robert A. Heinlein.",
    celebratedWorks: ["Foundation", "Foundation and Empire", "I, Robot", "The Gods Themselves"],
    awards: ["Special Hugo Award for All-Time Best Series", "Hugo Award (x6)", "Nebula Grand Master"]
  }
];

export const INITIAL_BOOKS = [
  {
    id: "book-1",
    title: "The Midnight Library",
    authorId: "author-1",
    authorName: "Matt Haig",
    genres: ["Fiction"],
    pageCount: 304,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    synopsis: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets? A dazzling novel about the infinite choices that go into a life well lived.",
    averageRating: 4.4,
    totalReviews: 18,
    // 10 five-stars, 6 four-stars, 2 three-stars -> Sum = 50 + 24 + 6 = 80. 80 / 18 = 4.444 -> 4.4
    // Adding 1 five-star review -> 85 / 19 = 4.4736 -> 4.5! Exact walkthrough match!
    ratingBreakdown: { 5: 10, 4: 6, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "book-2",
    title: "Project Hail Mary",
    authorId: "author-2",
    authorName: "Andy Weir",
    genres: ["Sci-Fi"],
    pageCount: 496,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    synopsis: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself are doomed. Except right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. An interstellar journey filled with scientific wit and unforgettable friendship.",
    averageRating: 4.8,
    totalReviews: 12,
    ratingBreakdown: { 5: 10, 4: 2, 3: 0, 2: 0, 1: 0 }
  },
  {
    id: "book-3",
    title: "Atomic Habits",
    authorId: "author-3",
    authorName: "James Clear",
    genres: ["Non-Fiction"],
    pageCount: 320,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
    synopsis: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    averageRating: 4.7,
    totalReviews: 15,
    ratingBreakdown: { 5: 11, 4: 3, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-4",
    title: "Dune",
    authorId: "author-4",
    authorName: "Frank Herbert",
    genres: ["Sci-Fi"],
    pageCount: 688,
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600",
    synopsis: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange. When House Atreides is betrayed, the story explores politics, ecology, religion, and the perilous power of messiahs.",
    averageRating: 4.6,
    totalReviews: 14,
    ratingBreakdown: { 5: 9, 4: 4, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-5",
    title: "Klara and the Sun",
    authorId: "author-5",
    authorName: "Kazuo Ishiguro",
    genres: ["Fiction"],
    pageCount: 320,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    synopsis: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse. She remains hopeful a customer will choose her soon, but when the possibility emerges that her circumstances may change, Klara is warned not to invest too much in the promises of humans.",
    averageRating: 4.3,
    totalReviews: 10,
    ratingBreakdown: { 5: 5, 4: 3, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "book-6",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    authorId: "author-6",
    authorName: "Gabrielle Zevin",
    genres: ["Fiction"],
    pageCount: 416,
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
    synopsis: "On a bitter-cold day, in the December of his junior year at Harvard, Sam Masur exits a subway car and sees, amid the throng of people, Sadie Green. He calls her name. For a moment, she pretends she hasn't heard, but then, she turns, and a game begins: a legendary collaboration that will launch them to stardom.",
    averageRating: 4.6,
    totalReviews: 11,
    ratingBreakdown: { 5: 7, 4: 3, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-7",
    title: "The Song of Achilles",
    authorId: "author-7",
    authorName: "Madeline Miller",
    genres: ["Fiction"],
    pageCount: 416,
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600",
    synopsis: "A thrilling, profoundly moving, and utterly unique retelling of the legend of Achilles and the Trojan War. Patroclus, an awkward young prince, follows Achilles into the golden fields of Phthia and eventually into the tragic crucible of war.",
    averageRating: 4.5,
    totalReviews: 13,
    ratingBreakdown: { 5: 8, 4: 3, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "book-8",
    title: "Circe",
    authorId: "author-7",
    authorName: "Madeline Miller",
    genres: ["Fiction"],
    pageCount: 400,
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=600",
    synopsis: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. Circe is a strange child—not powerful like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers witchcraft and must summon all her strength against monsters and gods.",
    averageRating: 4.4,
    totalReviews: 9,
    ratingBreakdown: { 5: 5, 4: 3, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-9",
    title: "Sapiens: A Brief History of Humankind",
    authorId: "author-8",
    authorName: "Yuval Noah Harari",
    genres: ["Non-Fiction"],
    pageCount: 464,
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600",
    synopsis: "One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—Homo sapiens. What happened to the others? And what may happen to us? Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.",
    averageRating: 4.6,
    totalReviews: 14,
    ratingBreakdown: { 5: 9, 4: 4, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-10",
    title: "Thinking, Fast and Slow",
    authorId: "author-9",
    authorName: "Daniel Kahneman",
    genres: ["Non-Fiction"],
    pageCount: 512,
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
    synopsis: "In this international bestseller, Daniel Kahneman, renowned psychologist and Nobel Prize winner, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think: System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    averageRating: 4.5,
    totalReviews: 8,
    ratingBreakdown: { 5: 5, 4: 2, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-11",
    title: "Educated",
    authorId: "author-10",
    authorName: "Tara Westover",
    genres: ["Biography"],
    pageCount: 352,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600",
    synopsis: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education. Her quest for knowledge transformed her, taking her over oceans and across continents to Harvard and Cambridge.",
    averageRating: 4.7,
    totalReviews: 16,
    ratingBreakdown: { 5: 12, 4: 3, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-12",
    title: "Steve Jobs",
    authorId: "author-11",
    authorName: "Walter Isaacson",
    genres: ["Biography"],
    pageCount: 656,
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
    synopsis: "Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries.",
    averageRating: 4.6,
    totalReviews: 11,
    ratingBreakdown: { 5: 8, 4: 2, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-13",
    title: "Born a Crime",
    authorId: "author-12",
    authorName: "Trevor Noah",
    genres: ["Biography"],
    pageCount: 304,
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600",
    synopsis: "Trevor Noah's unlikely path from apartheid South Africa to the desk of The Daily Show began with a criminal act: his birth. Trevor was born to a white Swiss father and a Black Xhosa mother at a time when such a union was punishable by five years in prison. Living proof of his parents' indiscretion, Trevor was kept mostly indoors for the earliest years of his life.",
    averageRating: 4.8,
    totalReviews: 15,
    ratingBreakdown: { 5: 12, 4: 3, 3: 0, 2: 0, 1: 0 }
  },
  {
    id: "book-14",
    title: "A Promised Land",
    authorId: "author-13",
    authorName: "Barack Obama",
    genres: ["Biography"],
    pageCount: 768,
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600",
    synopsis: "A highly personal account of history in the making—from the president who inspired us to believe in the power of democracy. In this stirring, highly anticipated first volume of his presidential memoirs, Barack Obama tells the story of his improbable odyssey from young man searching for his identity to leader of the free world.",
    averageRating: 4.5,
    totalReviews: 10,
    ratingBreakdown: { 5: 6, 4: 3, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-15",
    title: "Neuromancer",
    authorId: "author-14",
    authorName: "William Gibson",
    genres: ["Sci-Fi"],
    pageCount: 271,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    synopsis: "Case had been the sharpest data-thief in the business, until vengeful ex-employers crippled his nervous system. But a new and enigmatic employer recruits him for a last-chance run at an unthinkably powerful artificial intelligence orbiting earth in service of the sinister Tessier-Ashpool clan.",
    averageRating: 4.3,
    totalReviews: 7,
    ratingBreakdown: { 5: 3, 4: 3, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "book-16",
    title: "Foundation",
    authorId: "author-15",
    authorName: "Isaac Asimov",
    genres: ["Sci-Fi"],
    pageCount: 255,
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600",
    synopsis: "For twelve thousand years the Galactic Empire has ruled supreme. Yesterday the mathematician Hari Seldon foresaw its inevitable collapse and a thirty-thousand-year dark age. To preserve civilization, he gathers the finest minds in the galaxy on the edge of the universe to build the Foundation.",
    averageRating: 4.5,
    totalReviews: 12,
    ratingBreakdown: { 5: 7, 4: 4, 3: 1, 2: 0, 1: 0 }
  }
];

export const INITIAL_REVIEWS = [
  // 18 seed reviews for The Midnight Library (Book 1)
  {
    id: "rev-1",
    bookId: "book-1",
    reviewerName: "Elena Vance",
    starRating: 5,
    headline: "An inspiring look at existential second chances",
    critiqueText: "The Midnight Library resonated with me deeply. Seeing Nora navigate all the parallel lives she thought she wanted made me appreciate the ordinary beauty of the life I already have.",
    containsSpoilers: false,
    timestamp: "2026-10-12T14:22:00Z"
  },
  {
    id: "rev-2",
    bookId: "book-1",
    reviewerName: "Marcus Sterling",
    starRating: 5,
    headline: "Comforting, philosophical, and warm",
    critiqueText: "Haig handles heavy themes like regret and depression with genuine tenderness. It reads like a modern fairy tale for anxious adults who wonder 'what if?'.",
    containsSpoilers: false,
    timestamp: "2026-10-14T09:15:00Z"
  },
  {
    id: "rev-3",
    bookId: "book-1",
    reviewerName: "Sophia Patel",
    starRating: 4,
    headline: "Wonderful concept, predictable finish",
    critiqueText: "The premise is 10/10. Nora travelling into the Svalbard glacier and becoming a glaciologist was my favorite chapter. The moral resolution is somewhat expected, but still touching.",
    containsSpoilers: true,
    timestamp: "2026-10-18T18:40:00Z"
  },
  {
    id: "rev-4",
    bookId: "book-1",
    reviewerName: "David Kim",
    starRating: 5,
    headline: "A reminder that we don't have to live every life",
    critiqueText: "We only need to live one life to experience meaning. Mrs. Elm's dialogue is packed with quiet wisdom. Perfect book club selection.",
    containsSpoilers: false,
    timestamp: "2026-10-20T11:05:00Z"
  },
  {
    id: "rev-5",
    bookId: "book-1",
    reviewerName: "Chloe Dupont",
    starRating: 4,
    headline: "Helped me through a career transition",
    critiqueText: "I was having severe career remorse when our campus reading circle picked this up. It gave me immediate perspective. The pacing in the middle chapters is brisk and fun.",
    containsSpoilers: false,
    timestamp: "2026-10-22T16:50:00Z"
  },
  {
    id: "rev-6",
    bookId: "book-1",
    reviewerName: "Liam O'Connor",
    starRating: 5,
    headline: "The Book of Regrets concept is brilliant",
    critiqueText: "The visual idea of a heavy book of regrets that shrinks as you forgive yourself was unforgettable. Everyone in our literary circle had a passionate opinion on it.",
    containsSpoilers: false,
    timestamp: "2026-10-25T08:30:00Z"
  },
  {
    id: "rev-7",
    bookId: "book-1",
    reviewerName: "Amina Al-Mansoor",
    starRating: 3,
    headline: "Slightly repetitive after 150 pages",
    critiqueText: "While I loved the opening, several of the alternate reality vignettes felt brief and repetitive. Still, Matt Haig writes with immense empathy and good intentions.",
    containsSpoilers: false,
    timestamp: "2026-10-28T13:12:00Z"
  },
  {
    id: "rev-8",
    bookId: "book-1",
    reviewerName: "Thomas Wright",
    starRating: 5,
    headline: "Masterpiece of emotional healing",
    critiqueText: "Few books have brought me to tears so gently. Nora's bond with her brother Joe in the rock star timeline broke my heart and then pieced it back together.",
    containsSpoilers: true,
    timestamp: "2026-11-01T20:00:00Z"
  },
  {
    id: "rev-9",
    bookId: "book-1",
    reviewerName: "Rachel Green",
    starRating: 4,
    headline: "Engaging campus circle read",
    critiqueText: "Prompted a two-hour discussion at our Thursday meeting. Everyone connected to a different regret. Great writing style that anyone can breeze through.",
    containsSpoilers: false,
    timestamp: "2026-11-02T17:15:00Z"
  },
  {
    id: "rev-10",
    bookId: "book-1",
    reviewerName: "Julian Vance",
    starRating: 5,
    headline: "A timeless allegory for the modern age",
    critiqueText: "The parallel worlds theoretical physics blend with cozy magical realism is executed to perfection. Haig's voice is authentic and comforting.",
    containsSpoilers: false,
    timestamp: "2026-11-04T12:00:00Z"
  },
  {
    id: "rev-11",
    bookId: "book-1",
    reviewerName: "Hannah Abbott",
    starRating: 4,
    headline: "Heartwarming and thoughtful",
    critiqueText: "A wonderful companion during a stressful semester. Nora feels like someone you know down the hall in the dorms.",
    containsSpoilers: false,
    timestamp: "2026-11-05T14:45:00Z"
  },
  {
    id: "rev-12",
    bookId: "book-1",
    reviewerName: "Oliver Queen",
    starRating: 5,
    headline: "Spectacular pacing and emotional resonance",
    critiqueText: "Read it in one weekend. Could not put it down until the library started crumbling around Nora. Highly recommended for any book club.",
    containsSpoilers: true,
    timestamp: "2026-11-06T19:30:00Z"
  },
  {
    id: "rev-13",
    bookId: "book-1",
    reviewerName: "Zoe Saldana",
    starRating: 4,
    headline: "A philosophical warm hug",
    critiqueText: "Addresses genuine existential dread without becoming nihilistic. Instead, it offers genuine hope rooted in being present.",
    containsSpoilers: false,
    timestamp: "2026-11-07T10:20:00Z"
  },
  {
    id: "rev-14",
    bookId: "book-1",
    reviewerName: "Carlos Santana",
    starRating: 3,
    headline: "A bit heavy-handed with its moral message",
    critiqueText: "I enjoyed the fantasy conceit, but the central message is repeated quite often. Still worth reading for the imaginative library setting.",
    containsSpoilers: false,
    timestamp: "2026-11-08T15:10:00Z"
  },
  {
    id: "rev-15",
    bookId: "book-1",
    reviewerName: "Maya Lin",
    starRating: 5,
    headline: "Every university student needs to read this",
    critiqueText: "When you are 20 and paralyzed by making the wrong choices in life, this book provides the exact antidote you need.",
    containsSpoilers: false,
    timestamp: "2026-11-09T18:05:00Z"
  },
  {
    id: "rev-16",
    bookId: "book-1",
    reviewerName: "Lucas Scott",
    starRating: 4,
    headline: "Delightful characters and crisp dialogue",
    critiqueText: "The chess game metaphor running throughout the library gave structure to the philosophical explorations. Thoroughly enjoyed it.",
    containsSpoilers: false,
    timestamp: "2026-11-10T11:40:00Z"
  },
  {
    id: "rev-17",
    bookId: "book-1",
    reviewerName: "Beatriz Rossi",
    starRating: 5,
    headline: "Leaves you with a profound sense of gratitude",
    critiqueText: "When Nora finally writes her own story on the blank pages, you feel an immense release. Beautiful, poetic prose.",
    containsSpoilers: true,
    timestamp: "2026-11-11T21:15:00Z"
  },
  {
    id: "rev-18",
    bookId: "book-1",
    reviewerName: "Devon James",
    starRating: 5,
    headline: "A modern classic for book circles",
    critiqueText: "One of the most rewarding circle discussions we've had this year. Easy to read, deeply introspective, and universally relatable.",
    containsSpoilers: false,
    timestamp: "2026-11-12T16:00:00Z"
  },

  // Reviews for other books to reach 40 total
  {
    id: "rev-19",
    bookId: "book-2",
    reviewerName: "Dr. Evelyn Reed",
    starRating: 5,
    headline: "Hard science fiction with pure heart",
    critiqueText: "Andy Weir did it again! The banter between Grace and Rocky is phenomenal. Science problems solved with actual physics and chemistry.",
    containsSpoilers: false,
    timestamp: "2026-10-05T09:00:00Z"
  },
  {
    id: "rev-20",
    bookId: "book-2",
    reviewerName: "Nathan Drake",
    starRating: 5,
    headline: "Amaze! Amaze! Amaze!",
    critiqueText: "Best sci-fi companion in decades. The tension never lets up, and the engineering ingenuity is mind-blowing.",
    containsSpoilers: false,
    timestamp: "2026-10-15T14:30:00Z"
  },
  {
    id: "rev-21",
    bookId: "book-3",
    reviewerName: "Priya Sharma",
    starRating: 5,
    headline: "The single most actionable book I have ever read",
    critiqueText: "Clear explains the four laws of behavior change with remarkable clarity. The 1% compounding rule changed my study habits completely.",
    containsSpoilers: false,
    timestamp: "2026-09-28T11:20:00Z"
  },
  {
    id: "rev-22",
    bookId: "book-3",
    reviewerName: "Jordan Bell",
    starRating: 4,
    headline: "Simple yet revolutionary framework",
    critiqueText: "You do not rise to the level of your goals, you fall to the level of your systems. Great advice that actually sticks.",
    containsSpoilers: false,
    timestamp: "2026-10-08T17:45:00Z"
  },
  {
    id: "rev-23",
    bookId: "book-4",
    reviewerName: "Farhan Qureshi",
    starRating: 5,
    headline: "Monolithic world-building that stands unmatched",
    critiqueText: "The political machinations of the Landsraad and the Fremen culture on Arrakis are breathtaking in scope.",
    containsSpoilers: false,
    timestamp: "2026-09-12T20:10:00Z"
  },
  {
    id: "rev-24",
    bookId: "book-4",
    reviewerName: "Claire Bennett",
    starRating: 4,
    headline: "Dense, poetic, and thrilling",
    critiqueText: "Requires patience in the first 100 pages, but once the Atreides arrive on Dune, the stakes never decrease.",
    containsSpoilers: false,
    timestamp: "2026-10-01T15:00:00Z"
  },
  {
    id: "rev-25",
    bookId: "book-5",
    reviewerName: "Simon Ross",
    starRating: 4,
    headline: "Subtle, melancholy, and deeply human",
    critiqueText: "Ishiguro uses Klara's innocent perspective to question what makes the human heart singular. A tender masterpiece.",
    containsSpoilers: false,
    timestamp: "2026-10-19T13:25:00Z"
  },
  {
    id: "rev-26",
    bookId: "book-6",
    reviewerName: "Tasha Yar",
    starRating: 5,
    headline: "A love letter to creativity and play",
    critiqueText: "Not a romantic comedy, but a love story about collaboration and the worlds we build together. Pure joy to read.",
    containsSpoilers: false,
    timestamp: "2026-10-24T16:40:00Z"
  },
  {
    id: "rev-27",
    bookId: "book-7",
    reviewerName: "Kallisto Ray",
    starRating: 5,
    headline: "Lyrical prose that shatters you completely",
    critiqueText: "Miller's retelling gives Patroclus and Achilles a living heartbeat. The descriptions of their youth in Phthia will stay with me forever.",
    containsSpoilers: false,
    timestamp: "2026-10-11T12:00:00Z"
  },
  {
    id: "rev-28",
    bookId: "book-8",
    reviewerName: "Cassandra Cain",
    starRating: 4,
    headline: "Vivid feminist reclaiming of mythological power",
    critiqueText: "Circe transforms from an overlooked goddess into an independent force of craft and agency. Miller's voice is magnificent.",
    containsSpoilers: false,
    timestamp: "2026-10-30T10:15:00Z"
  },
  {
    id: "rev-29",
    bookId: "book-9",
    reviewerName: "Dr. Alistair Finch",
    starRating: 5,
    headline: "Expands your perspective on human history",
    critiqueText: "Harari makes you rethink the agricultural revolution and the power of shared fictions like money and corporations.",
    containsSpoilers: false,
    timestamp: "2026-09-18T14:10:00Z"
  },
  {
    id: "rev-30",
    bookId: "book-10",
    reviewerName: "Gwen Stacy",
    starRating: 5,
    headline: "Reveals the cognitive blind spots we all have",
    critiqueText: "Kahneman's dichotomy between fast intuitive thinking and slow deliberate calculation is essential reading for every student.",
    containsSpoilers: false,
    timestamp: "2026-10-03T09:40:00Z"
  },
  {
    id: "rev-31",
    bookId: "book-11",
    reviewerName: "Grace Hopper",
    starRating: 5,
    headline: "An astonishing testament to the power of education",
    critiqueText: "Tara's journey from isolated survivalism to academic brilliance is harrowing, courageous, and deeply illuminating.",
    containsSpoilers: false,
    timestamp: "2026-10-16T18:20:00Z"
  },
  {
    id: "rev-32",
    bookId: "book-11",
    reviewerName: "Felix Henderson",
    starRating: 4,
    headline: "Unflinchingly honest memoir",
    critiqueText: "The tension between loyalty to family and loyalty to truth is handled with immense integrity and poise.",
    containsSpoilers: false,
    timestamp: "2026-11-03T11:00:00Z"
  },
  {
    id: "rev-33",
    bookId: "book-12",
    reviewerName: "Aaron Sorkin Fan",
    starRating: 5,
    headline: "Unvarnished portrait of a complex visionary",
    critiqueText: "Isaacson never sanitizes Jobs' abrasive temper, while highlighting his singular genius at the intersection of tech and liberal arts.",
    containsSpoilers: false,
    timestamp: "2026-10-21T19:50:00Z"
  },
  {
    id: "rev-34",
    bookId: "book-13",
    reviewerName: "Kagiso Rabada",
    starRating: 5,
    headline: "Hilarious, heartbreaking, and triumphant",
    critiqueText: "Trevor's mother Patricia is the true hero of this memoir. Her bravery and faith in the face of brutal oppression is unforgettable.",
    containsSpoilers: false,
    timestamp: "2026-10-29T15:30:00Z"
  },
  {
    id: "rev-35",
    bookId: "book-13",
    reviewerName: "Samantha Bee",
    starRating: 5,
    headline: "Laughed out loud on every other page",
    critiqueText: "Noah's storytelling prowess is extraordinary. He captures the tragedy of apartheid with incredible comic timing and love.",
    containsSpoilers: false,
    timestamp: "2026-11-04T08:15:00Z"
  },
  {
    id: "rev-36",
    bookId: "book-14",
    reviewerName: "Theodore Parker",
    starRating: 5,
    headline: "Reflective, elegant, and introspective",
    critiqueText: "A rare presidential memoir that examines moral doubt, legislative compromise, and the immense weight of the office.",
    containsSpoilers: false,
    timestamp: "2026-10-09T13:40:00Z"
  },
  {
    id: "rev-37",
    bookId: "book-15",
    reviewerName: "Case Decker",
    starRating: 4,
    headline: "The matrix before the matrix existed",
    critiqueText: "Gibson's prose crackles like neon static. The Chiba City opening line remains one of the greatest in science fiction history.",
    containsSpoilers: false,
    timestamp: "2026-10-14T21:00:00Z"
  },
  {
    id: "rev-38",
    bookId: "book-16",
    reviewerName: "Hari Hari",
    starRating: 5,
    headline: "Psychohistory is one of sci-fi's greatest ideas",
    critiqueText: "Asimov's grand scope and faith in human reason make Foundation a thrilling intellectual adventure.",
    containsSpoilers: false,
    timestamp: "2026-10-27T17:10:00Z"
  },
  {
    id: "rev-39",
    bookId: "book-2",
    reviewerName: "Astrid Lindgren",
    starRating: 5,
    headline: "Heartwarming space adventure",
    critiqueText: "Grace and Rocky communicate across biology and physics. A glorious testament to science and friendship.",
    containsSpoilers: true,
    timestamp: "2026-11-05T12:00:00Z"
  },
  {
    id: "rev-40",
    bookId: "book-6",
    reviewerName: "Penny Arcade",
    starRating: 4,
    headline: "Emotional journey through game development",
    critiqueText: "Captures the exhilaration and heartbreak of creative partnerships. A must-read for any gamer or creative artist.",
    containsSpoilers: false,
    timestamp: "2026-11-08T20:45:00Z"
  }
];

export const INITIAL_CIRCLES = [
  {
    id: "circle-1",
    name: "Campus Book Club",
    currentBookId: "book-1",
    bookTitle: "The Midnight Library",
    bookAuthor: "Matt Haig",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    memberCount: 18,
    schedule: "Thursdays at 7:00 PM • University Library Room 3B & Zoom",
    description: "The primary campus literary circle exploring contemporary fiction, philosophical novels, and literary prize-winners.",
    userProgress: {
      currentPage: 210,
      totalPages: 304,
      updatedAt: "2026-11-16T14:30:00Z"
    },
    chapters: [
      { id: "ch-1", number: 1, title: "A Conversation About Rain & The Clock Strikes Twelve" },
      { id: "ch-5", number: 5, title: "The Book of Regrets & First Parallel Path" },
      { id: "ch-12", number: 12, title: "The Glacier and the Polar Bear - Nora in Svalbard" },
      { id: "ch-20", number: 20, title: "A Great Volcano & Nora's Final Choice" }
    ]
  },
  {
    id: "circle-2",
    name: "Sci-Fi Voyagers",
    currentBookId: "book-2",
    bookTitle: "Project Hail Mary",
    bookAuthor: "Andy Weir",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    memberCount: 24,
    schedule: "Bi-weekly Tuesdays at 8:00 PM • Discord Voice Stage",
    description: "For enthusiasts of hard science fiction, space exploration, physics puzzles, and speculative futures.",
    userProgress: {
      currentPage: 348,
      totalPages: 496,
      updatedAt: "2026-11-15T19:10:00Z"
    },
    chapters: [
      { id: "ch-sf-1", number: 1, title: "Amnesia in Slumber" },
      { id: "ch-sf-7", number: 7, title: "First Contact with the Blip-A" },
      { id: "ch-sf-15", number: 15, title: "Taumoeba Breeding Experiments" }
    ]
  },
  {
    id: "circle-3",
    name: "Non-Fiction Thinkers",
    currentBookId: "book-3",
    bookTitle: "Atomic Habits",
    bookAuthor: "James Clear",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
    memberCount: 15,
    schedule: "First & Third Sunday of every month • Student Union Cafe",
    description: "Focusing on personal growth, behavioral psychology, habit architecture, and decision frameworks.",
    userProgress: {
      currentPage: 256,
      totalPages: 320,
      updatedAt: "2026-11-14T10:00:00Z"
    },
    chapters: [
      { id: "ch-nf-1", number: 1, title: "The Surprising Power of Atomic Habits" },
      { id: "ch-nf-4", number: 4, title: "Make It Obvious & Habit Stacking" },
      { id: "ch-nf-10", number: 10, title: "The Goldilocks Rule & Mental Toughness" }
    ]
  }
];

export const INITIAL_CHAPTER_POSTS = [
  {
    id: "post-1",
    circleId: "circle-1",
    chapterId: "ch-12",
    chapterTitle: "Chapter 12: The Glacier and the Polar Bear - Nora in Svalbard",
    authorName: "Maya Lin",
    timestamp: "2026-11-14T16:20:00Z",
    content: "When Nora steps out onto the freezing Arctic ice and encounters the polar bear, her instinct to live finally wakes up. That moment was the turning point of the entire novel for me! It proves that survival isn't intellectual; it's instinctual.",
    containsSpoilers: true
  },
  {
    id: "post-2",
    circleId: "circle-1",
    chapterId: "ch-12",
    chapterTitle: "Chapter 12: The Glacier and the Polar Bear - Nora in Svalbard",
    authorName: "Carlos Santana",
    timestamp: "2026-11-14T17:45:00Z",
    content: "I loved how her knowledge from her original life—remembering how to bang the pans and make loud noise—saved her life on the ice. She carried her past self with her even in a different universe.",
    containsSpoilers: true
  },
  {
    id: "post-3",
    circleId: "circle-1",
    chapterId: "ch-12",
    chapterTitle: "Chapter 12: The Glacier and the Polar Bear - Nora in Svalbard",
    authorName: "Marcus Sterling",
    timestamp: "2026-11-15T09:10:00Z",
    content: "The imagery of the Svalbard archipelago is breathtaking here. You can feel the sub-zero wind on the pages.",
    containsSpoilers: false
  },
  {
    id: "post-4",
    circleId: "circle-1",
    chapterId: "ch-1",
    chapterTitle: "Chapter 1: A Conversation About Rain & The Clock Strikes Twelve",
    authorName: "Elena Vance",
    timestamp: "2026-11-10T11:00:00Z",
    content: "The contrast between the dreary Bedford rain and the infinite neon green clock ticking at 00:00:00 sets such a moody tone for the beginning of the journey.",
    containsSpoilers: false
  },
  {
    id: "post-5",
    circleId: "circle-1",
    chapterId: "ch-5",
    chapterTitle: "Chapter 5: The Book of Regrets & First Parallel Path",
    authorName: "Sophia Patel",
    timestamp: "2026-11-12T13:30:00Z",
    content: "If you were handed your own Book of Regrets, what size do you think it would be? Nora's was too heavy to lift. That hit right home.",
    containsSpoilers: false
  }
];

export const INITIAL_QUOTES = [
  {
    id: "quote-1",
    bookTitle: "The Midnight Library",
    author: "Matt Haig",
    quote: "You don't have to understand life. You just have to live it.",
    savedAt: "2026-11-10T14:00:00Z",
    note: "Read during a stressful week of exams. Put things into crystal clear perspective."
  },
  {
    id: "quote-2",
    bookTitle: "Atomic Habits",
    author: "James Clear",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    savedAt: "2026-11-08T18:20:00Z",
    note: "My daily study routine mantra."
  },
  {
    id: "quote-3",
    bookTitle: "Project Hail Mary",
    author: "Andy Weir",
    quote: "Human beings have a remarkable ability to accept the abnormal and make it normal.",
    savedAt: "2026-11-05T09:15:00Z",
    note: "Grace observing human adaptability."
  },
  {
    id: "quote-4",
    bookTitle: "The Song of Achilles",
    author: "Madeline Miller",
    quote: "He is half of my soul, as the poets say.",
    savedAt: "2026-10-31T20:10:00Z",
    note: "One of the most poetic romantic declarations in literature."
  },
  {
    id: "quote-5",
    bookTitle: "Dune",
    author: "Frank Herbert",
    quote: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
    savedAt: "2026-10-25T11:45:00Z",
    note: "The Bene Gesserit Litany Against Fear."
  }
];

export const INITIAL_READING_GOAL = {
  current: 14,
  target: 25,
  year: 2026,
  completedTitles: [
    "The Midnight Library", "Project Hail Mary", "Atomic Habits", "Educated", 
    "Steve Jobs", "Circe", "Sapiens", "Thinking, Fast and Slow", "Born a Crime",
    "Klara and the Sun", "Tomorrow, and Tomorrow, and Tomorrow", "The Song of Achilles",
    "Neuromancer", "Dune"
  ]
};
