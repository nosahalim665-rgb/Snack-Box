import { useState, useEffect, useRef } from "react";
import {
  X,
  Truck,
  ShoppingCart,
  Package,
  Gift,
  Users,
  Sparkles,
  Zap,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  Play,
  Maximize2,
  Eye,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import AutoScrollCarousel from "../components/AutoScrollCarousel";

// Helper function to calculate pricing
const calculatePricing = (salePrice: string) => {
  const salePriceNumeric = parseFloat(salePrice.replace('$', ''));
  // Following the formula: regularPrice = salePrice / 0.3 (since salePrice = regularPrice * 0.3)
  const regularPriceCalculated = salePriceNumeric / 0.3;

  // Round up to .99 - get the integer part and add .99
  const regularPriceRounded = Math.floor(regularPriceCalculated) + 0.99;

  return {
    salePrice: salePrice,
    regularPrice: `$${regularPriceRounded.toFixed(2)}`
  };
};

const products = [
  {
    id: 1,
    name: "Gift a Snack Spread the Joy Snack Pack, Assorted College Care Package for Students, Office Party, 35 Count",
    shortName: "Gift a Snack – Spread the Joy Snack Pack",
    description:
      "Spread joy with the perfect gift for adults, teens, and college students. Premium assortment of chips, crackers, cookies, and candy in beautifully branded high-end packaging.",
    size: "35 ct",
    price: "$22.97",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F77788b1b06194d9e9278b4a63bb3471e?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-35-Count-Snacks-Box-with-Variety-Assortment-of-snack-packs-chips-variety-Crackers-Cookies-Candy/6277108895?classType=VARIANT",
    bulletPoints: [
      "Beautifully branded high-end packaging for an impressive gift.",
      "Convenient individual servings for on-the-go snacking.",
      "Includes a heartwarming greeting card for a personal touch.",
      "Spread joy with the perfect gift for adults, teens, and college students.",
      "Variety assortment of chips, crackers, cookies, and candy.",
      "Honesty is our main value – some snacks may be replaced for similar or more value.",
      "Gift a Snack – the ultimate snack box for any occasion.",
      "Mouthwatering treats inside – Airheads, Cheez It, Famous Amos, and more!"
    ]
  },
  {
    id: 2,
    name: "Gift a Snack Chip Variety Snack Box - 42 Count",
    description:
      "Includes 42 premium snacks from brands like Airheads, Cheez It, and Famous Amos. Comes in high-end packaging with a greeting card. Great for students, employees, and family members.",
    size: "42 ct",
    price: "$23.96",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd06d6ab52e341e2b57efd6b128aeeaa?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-Chip-Variety-Snack-Box-Snack-Pack-Variety-Box-42-Count/5298521902?classType=VARIANT&athbdg=L1600",
  },
  {
    id: 3,
    name: "Gift a Snack Chip Variety Snack Box - 52 Count",
    description:
      "52-count snack box filled with a diverse variety of sweet and salty treats. Ideal for care packages, corporate gifts, or family movie nights.",
    size: "52 ct",
    price: "$31.46",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F5ff73d8278224c2ab0b862f059e3802c?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-52-Count-Snack-Box-with-Variety-Snacks-Chips-Crackers-Cookies-Candy/5915077819?classType=VARIANT&athbdg=L1900",
  },
  {
    id: 4,
    name: "Gift A Snack Snack Box Care Package - 105 Count",
    description:
      'Dive into the ultimate snacking experience with the "Gift A Snack" Snack Box Care Package. Our 105-count variety pack brims with a mix of America\'s favorite candies, chips, crackers, and bars, offering something delicious for every craving. Perfectly packaged in individual servings for on-the-go ease, each box also includes a cheerful greeting card to spread extra joy. Thoughtfully presented in a beautifully branded box, this snack pack makes a fantastic gift for adults, teens, college students, or anyone who deserves a special treat. Note: Some snacks may vary but will always be of equal or greater value.',
    size: "105 ct",
    price: "$45.97",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F936b74c9566f406ebebd96074d052d09?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Ultimate-Snack-Box-Variety-Pack-105-Count-by-Gift-A-Snack/14496505954?classType=VARIANT",
  },
];

const features = [
  {
    title: "Huge Variety",
    description: "Over 30 types of snacks",
    icon: Package,
  },
  {
    title: "Luxury Packaging",
    description: "Perfect as a gift",
    icon: Gift,
  },
  {
    title: "For Everyone",
    description: "Kids, students, employees",
    icon: Users,
  },
  {
    title: "Fresh & Tasty",
    description: "Guaranteed quality",
    icon: Sparkles,
  },
  {
    title: "Easy to Order",
    description: "Fast shipping",
    icon: Zap,
  },
];

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const openFirstProductModal = () => {
    setSelectedProduct(products[0]);
  };

  // Swipe to close functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -100; // Swipe down by more than 100px

    if (isDownSwipe) {
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setShowFloatingButton(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Robust TikTok embed initialization
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const loadTikTokScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector(
          'script[src*="tiktok.com/embed.js"]',
        );
        if (existingScript) {
          existingScript.remove();
        }

        // Create new script with cache-busting
        const script = document.createElement("script");
        script.src = `https://www.tiktok.com/embed.js?v=${Date.now()}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load TikTok script"));

        // Append to body instead of head
        document.body.appendChild(script);
      });
    };

    const initializeTikTokEmbeds = async () => {
      try {
        // Wait for script to load
        await loadTikTokScript();

        // Wait a bit for the script to initialize
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Try to render embeds with retry logic
        const attemptRender = () => {
          if ((window as any).tiktokEmbed?.lib?.render) {
            console.log("TikTok embeds initialized successfully");
            (window as any).tiktokEmbed.lib.render();
            return true;
          }
          return false;
        };

        // Retry logic
        const retry = () => {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(
              `Retrying TikTok embed initialization (${retryCount}/${maxRetries})`,
            );

            if (!attemptRender()) {
              setTimeout(retry, 1000);
            }
          } else {
            console.error(
              "Failed to initialize TikTok embeds after maximum retries",
            );
          }
        };

        if (!attemptRender()) {
          retry();
        }
      } catch (error) {
        console.error("Error loading TikTok script:", error);
        // Retry the entire process
        if (retryCount < maxRetries) {
          setTimeout(initializeTikTokEmbeds, 2000);
        }
      }
    };

    // Start initialization after component mounts
    const timer = setTimeout(initializeTikTokEmbeds, 100);

    return () => {
      clearTimeout(timer);
      // Clean up script on unmount
      const script = document.querySelector(
        'script[src*="tiktok.com/embed.js"]',
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Reinitialize TikTok embeds when the section becomes visible
  useEffect(() => {
    const tiktokSection = document.querySelector(".tiktok-section");
    if (!tiktokSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wait a bit, then try to reinitialize
            setTimeout(() => {
              if ((window as any).tiktokEmbed?.lib?.render) {
                console.log(
                  "Reinitializing TikTok embeds on section visibility",
                );
                (window as any).tiktokEmbed.lib.render();
              }
            }, 500);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(tiktokSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50 py-6 px-4 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
            {/* Content */}
            <div className="text-center lg:text-left fade-in">
              {/* Logo with frame */}
              <div className="flex justify-center lg:justify-start mb-2 sm:mb-5">
                <div className="bg-gray-100 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg inline-block">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd932fcd18414ba798762d622c2b825c?format=webp&width=400&quality=90"
                    alt="Gift A Snack - Premium Snack Box Company Logo"
                    className="h-16 sm:h-20 lg:h-24 w-auto"
                    loading="eager"
                    fetchPriority="high"
                    width="200"
                    height="96"
                  />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-logo-green/10 text-logo-green px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-4">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  Premium Quality Guaranteed
                </span>
                <span className="sm:hidden">Premium Quality</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-heading-red mb-2 sm:mb-4 leading-tight tracking-tight">
                <span className="block">Gift A Snack Box</span>
                <span className="block text-snack-dark-blue">
                  Perfect Gift for
                </span>
                <span className="block bg-gradient-to-r from-logo-green to-green-500 bg-clip-text text-transparent">
                  Snack Lovers
                </span>
              </h1>

              <p className="text-sm sm:text-base text-snack-dark-blue/80 mb-3 sm:mb-5 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                <span className="hidden sm:inline">
                  Premium assortment of delicious snacks, beautifully packaged.
                  Perfect for gifts, office treats, and special occasions.
                </span>
                <span className="sm:hidden">
                  Premium snack boxes perfect for gifts and special occasions.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 justify-center lg:justify-start mb-3 sm:mb-5">
                <button
                  onClick={scrollToProducts}
                  className="bg-logo-green hover:bg-green-500 text-white font-bold px-6 sm:px-6 py-4 sm:py-3 rounded-xl text-base sm:text-base button-enhanced flex items-center justify-center gap-2 min-h-[56px] sm:min-h-[48px] touch-manipulation tap-highlight-none focus-visible-ring"
                >
                  <Package className="w-5 h-5" />
                  Shop Now
                </button>
                <button className="border-2 border-logo-green text-logo-green hover:bg-logo-green hover:text-white font-bold px-6 sm:px-6 py-4 sm:py-3 rounded-xl text-base sm:text-base transition-all duration-300 min-h-[56px] sm:min-h-[48px] touch-manipulation tap-highlight-none focus-visible-ring">
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs text-snack-dark-blue/60">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-logo-green" />
                  <span className="hidden sm:inline">30+ Snack Varieties</span>
                  <span className="sm:hidden">30+ Varieties</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-logo-green" />
                  Fast Shipping
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-logo-green" />
                  Gift Ready
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-logo-green/20 to-green-400/20 rounded-2xl transform rotate-6"></div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ffc09862a9f0941d4aeda13a8cb2480bc%2F9a927196010f464595d03440e3666d58?format=webp&width=800&quality=85"
                  alt="Gift A Snack premium variety snack boxes collection featuring chips, crackers, cookies and candy assortments"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl image-hover"
                  loading="eager"
                  fetchPriority="high"
                  width="600"
                  height="400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Scrolling Banner Carousel */}
      <AutoScrollCarousel />

      {/* Features & Benefits Section */}
      <section className="py-6 sm:py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-2 sm:mb-3 tracking-tight">
              Why Choose Gift A Snack Box?
            </h2>
            <p className="text-base text-snack-dark-blue/70 max-w-xl mx-auto">
              Discover what makes our snack boxes the perfect choice for every
              occasion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center card-enhanced p-5 hover:scale-105 transition-all duration-300"
                >
                  <div className="feature-icon mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-heading-red mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Sizes Section */}
      <section
        id="products-section"
        className="py-6 sm:py-12 px-4 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-2 sm:mb-3 tracking-tight">
              Choose Your Perfect Snack Box Size
            </h2>
            <p className="text-base text-snack-dark-blue/70 max-w-xl mx-auto">
              From small treats to large celebrations, we have the perfect size
              for every occasion
            </p>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="block sm:hidden">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4 w-max">
                {products.map((product, index) => {
                  const pricing = calculatePricing(product.price);
                  return (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="card-enhanced overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer w-[280px] flex-shrink-0 active:scale-95"
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={`${product.image}&quality=85`}
                          alt={`${product.name} - Premium snack variety box with ${product.size} assorted treats perfect for gifting`}
                          className="w-full h-full object-cover image-hover"
                          loading="lazy"
                          width="280"
                          height="280"
                        />
                        {index === 1 && (
                          <div className="absolute top-3 right-3 bg-logo-green text-white px-2 py-1 rounded-full text-xs font-bold">
                            Popular
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="text-sm font-bold text-heading-red mb-2 line-clamp-2 group-hover:text-logo-green transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed text-xs">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-heading-red">
                                {pricing.salePrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {pricing.regularPrice}
                              </span>
                            </div>
                            <span className="text-xs text-red-600 font-semibold">
                              Save {((parseFloat(pricing.regularPrice.replace('$', '')) - parseFloat(pricing.salePrice.replace('$', ''))) / parseFloat(pricing.regularPrice.replace('$', '')) * 100).toFixed(0)}%
                            </span>
                          </div>
                          <span className="text-xs text-white font-semibold bg-logo-green px-2 py-1 rounded-full">
                            {product.size}
                          </span>
                        </div>
                        <div className="w-full bg-logo-green/10 text-logo-green font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1 border border-logo-green/30">
                          <Package className="w-3 h-3" />
                          Tap to Open Your Box
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Scroll indicator */}
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500">← Swipe to see more boxes →</span>
            </div>
          </div>

          {/* Desktop/Tablet Grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {products.map((product, index) => {
              const pricing = calculatePricing(product.price);
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="card-enhanced overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={`${product.image}&quality=85`}
                      alt={`${product.name} - Premium snack variety box with ${product.size} assorted treats perfect for gifting`}
                      className="w-full h-full object-cover image-hover"
                      loading="lazy"
                      width="300"
                      height="300"
                    />
                    {index === 1 && (
                      <div className="absolute top-3 right-3 bg-logo-green text-white px-2 py-1 rounded-full text-xs font-bold">
                        Popular
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-bold text-heading-red mb-2 line-clamp-2 group-hover:text-logo-green transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2 leading-relaxed text-xs">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-heading-red">
                            {pricing.salePrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {pricing.regularPrice}
                          </span>
                        </div>
                        <span className="text-xs text-red-600 font-semibold">
                          Save {((parseFloat(pricing.regularPrice.replace('$', '')) - parseFloat(pricing.salePrice.replace('$', ''))) / parseFloat(pricing.regularPrice.replace('$', '')) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <span className="text-xs text-white font-semibold bg-logo-green px-2 py-0.5 rounded-full">
                        {product.size}
                      </span>
                    </div>
                    <div className="w-full bg-logo-green text-white font-bold py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 group-hover:bg-green-500 transition-colors">
                      <Package className="w-3 h-3" />
                      Open Your Box
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />
      {/* TikTok Videos Section */}
      <section
        className="tiktok-section py-6 sm:py-12 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-10 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
              Watch Gift A Snack on TikTok
            </h2>
            <p className="text-base text-gray-300 max-w-xl mx-auto">
              See our snack boxes in action and get inspired for your next order
            </p>
          </div>

          {/* Call to action for videos */}
          <div className="text-center mb-6 sm:mb-8">
            <a
              href="https://tiktok.com/@nut.cravings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="w-4 h-4" />
              Follow us on TikTok
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* First TikTok Video */}
            <div
              className="tiktok-embed-container mb-8 lg:mb-0"
              dangerouslySetInnerHTML={{
                __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7522097145223187725" data-video-id="7522097145223187725" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a> <a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a> <a title="healthytreats" target="_blank" href="https://www.tiktok.com/tag/healthytreats?refer=embed">#HealthyTreats</a> <a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a> <a title="giftboxideas" target="_blank" href="https://www.tiktok.com/tag/giftboxideas?refer=embed">#GiftBoxIdeas</a> <a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a> <a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a> <a title="chipsandcandy" target="_blank" href="https://www.tiktok.com/tag/chipsandcandy?refer=embed">#ChipsAndCandy</a> <a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a> <a title="foodgiftbox" target="_blank" href="https://www.tiktok.com/tag/foodgiftbox?refer=embed">#FoodGiftBox</a> <a title="assortedsnacks" target="_blank" href="https://www.tiktok.com/tag/assortedsnacks?refer=embed">#AssortedSnacks</a> <a title="giftingmadeeasy" target="_blank" href="https://www.tiktok.com/tag/giftingmadeeasy?refer=embed">#GiftingMadeEasy</a> <a title="snacksurprise" target="_blank" href="https://www.tiktok.com/tag/snacksurprise?refer=embed">#SnackSurprise</a> <a title="collegecarepackage" target="_blank" href="https://www.tiktok.com/tag/collegecarepackage?refer=embed">#CollegeCarePackage</a> <a title="corporategifts" target="_blank" href="https://www.tiktok.com/tag/corporategifts?refer=embed">#CorporateGifts</a> <a title="snackaddict" target="_blank" href="https://www.tiktok.com/tag/snackaddict?refer=embed">#SnackAddict</a> <a target="_blank" title="♬ Product introduction, commercials, information, summer(1284254) - yutaka.T" href="https://www.tiktok.com/music/Product-introduction-commercials-information-summer-1284254-7133249539493857281?refer=embed">♬ Product introduction, commercials, information, summer(1284254) - yutaka.T</a> </section> </blockquote>`,
              }}
            />

            {/* Second TikTok Video */}
            <div
              className="tiktok-embed-container mb-8 lg:mb-0"
              dangerouslySetInnerHTML={{
                __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7521731881373682958" data-video-id="7521731881373682958" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacking" target="_blank" href="https://www.tiktok.com/tag/healthysnacking?refer=embed">#HealthySnacking</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a><a title="giftideas" target="_blank" href="https://www.tiktok.com/tag/giftideas?refer=embed">#GiftIdeas</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a> <a target="_blank" title="♬ Product introduction, commercials, information, summer(1284254) - yutaka.T" href="https://www.tiktok.com/music/Product-introduction-commercials-information-summer-1284254-7133249539493857281?refer=embed">♬ Product introduction, commercials, information, summer(1284254) - yutaka.T</a> </section> </blockquote>`,
              }}
            />

            {/* Third TikTok Video */}
            <div
              className="tiktok-embed-container mb-8 lg:mb-0"
              dangerouslySetInnerHTML={{
                __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7520248009863580983" data-video-id="7520248009863580983" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacks" target="_blank" href="https://www.tiktok.com/tag/healthysnacks?refer=embed">#HealthySnacks</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snackgiftbox" target="_blank" href="https://www.tiktok.com/tag/snackgiftbox?refer=embed">#SnackGiftBox</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a><a title="snacklover" target="_blank" href="https://www.tiktok.com/tag/snacklover?refer=embed">#SnackLover</a><a title="giftingideas" target="_blank" href="https://www.tiktok.com/tag/giftingideas?refer=embed">#GiftingIdeas</a> <a title="tiktokmademebuyit" target="_blank" href="https://www.tiktok.com/tag/tiktokmademebuyit?refer=embed">#TikTokMadeMeBuyIt</a> <a target="_blank" title="♬ Cowboy Sunday - Amanda Rosa" href="https://www.tiktok.com/music/Cowboy-Sunday-7057541372371093505?refer=embed">♬ Cowboy Sunday - Amanda Rosa</a> </section> </blockquote>`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="py-6 sm:py-12 px-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-logo-green/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="card-enhanced p-4 sm:p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-3 sm:mb-4 tracking-tight">
              Ready to Experience the Tastiest Gift A Snack Box?
            </h2>
            <p className="text-base text-snack-dark-blue/80 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers. Choose your perfect size
              and order now from Walmart.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4 sm:mb-6">
              <button
                onClick={scrollToProducts}
                className="bg-logo-green hover:bg-green-500 text-white font-bold px-6 sm:px-8 py-4 sm:py-3 rounded-xl text-base button-enhanced flex items-center justify-center gap-2 min-h-[56px] sm:min-h-[48px]"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Now
              </button>
              <button
                onClick={openFirstProductModal}
                className="border-2 border-logo-green text-logo-green hover:bg-logo-green hover:text-white font-bold px-6 sm:px-8 py-4 sm:py-3 rounded-xl text-base transition-all duration-300 min-h-[56px] sm:min-h-[48px]"
              >
                View Products
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-snack-dark-blue/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                30+ Premium Snacks
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                Gift-Ready Packaging
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                Fast US Shipping
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                Satisfaction Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Boosters */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Fast Shipping */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-logo-green/10 text-logo-green px-4 py-2 rounded-xl">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Fast & Guaranteed Shipping Across the United States
              </span>
            </div>
          </div>

          {/* Payment Icons */}
          <div className="text-center">
            <p className="text-gray-600 mb-4 text-sm font-semibold">
              Secure Payment Methods
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="w-16 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">
                VISA
              </div>
              <div className="w-16 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">
                MC
              </div>
              <div className="w-16 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">
                PayPal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-snack-dark-blue text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-heading-red">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#products-section"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-heading-red">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://tiktok.com/@nut.cravings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-logo-green transition-colors text-sm"
                >
                  TikTok
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-logo-green transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-logo-green transition-colors text-sm"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Walmart Link */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-heading-red">
                Order Now
              </h3>
              <a
                href={products[0].walmartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-logo-green hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-semibold button-enhanced"
              >
                Order from Walmart
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4 text-center">
            <p className="text-sm">
              &copy; 2025 Snack Box. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buy Now Button (Desktop & Mobile) */}
      {showFloatingButton && (
        <button
          onClick={openFirstProductModal}
          className="fixed bottom-4 right-4 sm:bottom-4 sm:right-4 bg-logo-green hover:bg-green-500 text-white font-bold px-4 sm:px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-xl shadow-xl z-50 transition-all duration-200 transform hover:scale-105 button-enhanced flex items-center gap-2 min-h-[56px] sm:min-h-[44px] min-w-[56px] sm:min-w-[44px]"
        >
          <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline text-sm">Buy Now</span>
          <span className="sm:hidden text-sm font-semibold">Buy</span>
        </button>
      )}

      {/* Enhanced Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 fade-in">
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl slide-up border-t-2 sm:border border-logo-green/20 relative"
            style={{
              animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Modal Header - Compact */}
            <div className="bg-gradient-to-r from-logo-green/5 to-logo-green/10 p-3 sm:p-4 border-b border-logo-green/20 relative">
              {/* Mobile swipe indicator */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2 sm:hidden"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-logo-green rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-heading-red">
                    Product Details
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 group min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto pb-24 sm:pb-4">
              {/* Full Width Product Image */}
              <div className="relative">
                <img
                  src={`${selectedProduct.image}&quality=85`}
                  alt={`${selectedProduct.name} - Detailed view of premium snack variety box contents`}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                  width="600"
                  height="320"
                />
                <div className="absolute top-3 right-3 bg-blue-600 p-2 rounded-lg shadow-lg">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F9eae62feb04c48cb96ee02dd2f9b0679?format=webp&width=100&quality=90"
                    alt="Premium quality guarantee"
                    className="h-4 w-4 filter brightness-0 invert"
                    loading="lazy"
                    width="16"
                    height="16"
                  />
                </div>
              </div>

              {/* Product Info - Compact */}
              <div className="p-4">
                {/* Product Name & Size */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-lg sm:text-xl font-bold text-heading-red leading-tight flex-1">
                    {selectedProduct.name}
                  </h4>
                  <span className="bg-logo-green text-white font-bold px-3 py-1 rounded-full text-sm shrink-0">
                    {selectedProduct.size}
                  </span>
                </div>

                {/* Pricing Section */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl mb-4 border border-red-100">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl sm:text-3xl font-bold text-heading-red">
                      {calculatePricing(selectedProduct.price).salePrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {calculatePricing(selectedProduct.price).regularPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      SAVE {((parseFloat(calculatePricing(selectedProduct.price).regularPrice.replace('$', '')) - parseFloat(calculatePricing(selectedProduct.price).salePrice.replace('$', ''))) / parseFloat(calculatePricing(selectedProduct.price).regularPrice.replace('$', '')) * 100).toFixed(0)}%
                    </span>
                    <span className="text-sm text-red-600 font-medium">
                      Limited time offer!
                    </span>
                  </div>
                </div>

                {/* Buy from Walmart Button - Prominent placement below price */}
                <div className="mb-6">
                  <a
                    href={selectedProduct.walmartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 text-center rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3 relative overflow-hidden"
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <ShoppingCart className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Buy from Walmart</span>
                    <ExternalLink className="w-4 h-4 relative z-10" />
                  </a>

                  {/* Trust indicators below main CTA */}
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-logo-green" />
                      Fast Shipping
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-logo-green" />
                      Secure Payment
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-logo-green" />
                      Easy Returns
                    </div>
                  </div>
                </div>

                {/* Product Description - Always Visible */}
                <div className="bg-snack-light-gray/50 p-4 rounded-xl mb-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-logo-green" />
                    <h5 className="font-semibold text-heading-red">Product Description</h5>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Key Features - Always Visible */}
                <div className="bg-logo-green/5 p-4 rounded-xl mb-4 border border-logo-green/20">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-logo-green" />
                    <h5 className="font-semibold text-heading-red">What's Included</h5>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-logo-green" />
                      Premium variety of snacks ({selectedProduct.size})
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-logo-green" />
                      Beautiful gift packaging
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-logo-green" />
                      Greeting card included
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-logo-green" />
                      Individually wrapped snacks
                    </div>
                  </div>
                </div>

                {/* Collapsible Additional Details */}
                <Accordion type="single" collapsible className="space-y-2">


                  {/* Shipping & Delivery */}
                  <AccordionItem value="shipping" className="border border-gray-200 rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-logo-green" />
                        <span className="font-semibold text-heading-red">Shipping & Delivery</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-logo-green" />
                          Fast shipping across the US
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-logo-green" />
                          Secure packaging guarantee
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-logo-green" />
                          Order tracking available
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-logo-green" />
                    Satisfaction Guaranteed
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-logo-green" />
                    Secure Payment
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Sticky Buy Button (Mobile fallback) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:hidden">
              <a
                href={selectedProduct.walmartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-logo-green to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 text-center rounded-xl text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy from Walmart - {calculatePricing(selectedProduct.price).salePrice}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
