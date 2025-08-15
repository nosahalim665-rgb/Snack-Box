import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "The best gift I've ever given my friend! Elegant packaging and the products are fresh and super tasty.",
    name: "Sarah M.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "I bought the box for my office and everyone loved the wide variety of snacks.",
    name: "Mike R.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Fast delivery, excellent quality, and I recommend it to everyone.",
    name: "Jessica L.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Perfect for our family movie nights! The kids absolutely love the variety of treats in each box.",
    name: "Amanda K.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Outstanding quality and presentation. This snack box exceeded all my expectations!",
    name: "David P.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Great customer service and amazing products. Will definitely order again for upcoming holidays.",
    name: "Lisa T.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-snack-gold text-snack-gold" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function TestimonialsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-sliding testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snack-red mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-snack-dark-blue/70 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Desktop: Show 3 testimonials */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((offset) => {
            const testimonialIndex =
              (currentTestimonial + offset) % testimonials.length;
            const testimonial = testimonials[testimonialIndex];
            return (
              <div
                key={testimonialIndex}
                className="card-enhanced p-8 hover:scale-105 transition-all duration-500"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-snack-green to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-snack-dark-blue text-lg">
                      {testimonial.name}
                    </h4>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed relative">
                  <span className="text-snack-green text-4xl absolute -top-2 -left-2 opacity-20">
                    "
                  </span>
                  {testimonial.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: Show 1 testimonial */}
        <div className="md:hidden">
          <div className="card-enhanced p-8 transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-snack-green to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                {testimonials[currentTestimonial].name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-snack-dark-blue text-lg">
                  {testimonials[currentTestimonial].name}
                </h4>
                <StarRating rating={testimonials[currentTestimonial].rating} />
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed relative">
              <span className="text-snack-green text-4xl absolute -top-2 -left-2 opacity-20">
                "
              </span>
              {testimonials[currentTestimonial].text}
            </p>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-snack-green" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
