import { Suspense } from "react";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedCars } from "@/actions/home";
import CarCard from "@/components/car-card";

// Import components lazily
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Lazy load components that aren't needed immediately
const HomeSearch = dynamic(() => import("@/components/home-search"), {
  ssr: true,
  loading: () => (
    <div className="h-12 w-full bg-gray-100 rounded animate-pulse"></div>
  ),
});

const Accordion = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.Accordion),
);

const AccordionContent = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.AccordionContent),
);

const AccordionItem = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.AccordionItem),
);

const AccordionTrigger = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.AccordionTrigger),
);

// Instead of dynamically importing the FeaturedCarsSection component,
// we'll use a client component wrapper
const FeaturedCarsWrapper = dynamic(() => import("@/components/featuredCars"), {
  ssr: true,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  ),
});

export default async function Home() {
  // Pre-fetch featured cars data on the server
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section with Gradient Title - critical render path */}
      <section
        className="relative py-16 md:py-0 md:min-h-[500px] bg-white flex items-center"
        style={{ overflow: "hidden" }}
      >
        <div className="w-full max-w-7xl mx-auto pl-2 pr-6 md:pl-4 md:pr-12 flex flex-col md:flex-row items-center gap-8 md:gap-0">
          {/* LEFT: unchanged */}
          <div className="flex-1 z-10 text-center md:text-left max-w-xl">
            <div className="mb-8">
              <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
                Find Your Perfect Ride with Ryder
              </h1>
              <p className="text-xl text-[#2a2a2a] font-semibold mb-8 max-w-2xl mx-auto md:mx-0">
                See a car you love? Upload the image, find it instantly, and
                book a test drive.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />
              }
            >
              <HomeSearch />
            </Suspense>
          </div>

          {/* RIGHT: bleeds to screen edge */}
          <div
            className="relative flex items-center justify-center min-h-[320px] md:min-h-[500px]"
            style={{
              flex: "1",
              marginRight:
                "calc(-50vw + 50%)" /* breaks out of max-w container */,
              paddingRight: "0",
            }}
          >
  
            {/* Blue polygon background */}
            <div className="absolute inset-0 z-0 overflow-visible">
  <img
    src="/hero-bg.png"
    alt=""
    className="
      absolute
      right-0
      top-0
      w-[140%] md:w-[110%]
      h-auto
      max-w-none
      object-contain
      md:top-[-15%]
      md:right-[-10%]
    "
  />
</div>

            {/* Car image */}
            <img
              src="/hero.png"
              alt="Rental car"
              className="relative z-10 object-contain"
              style={{
                width: "110%",
                maxWidth: "750px",
                transform: "translateX(-5%) translateY(4%)",
                filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.15))",
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Cars - lazy loaded */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 bg-gray-100 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            }
          >
            {/* Pass the pre-fetched data to the wrapper component */}
            <FeaturedCarsWrapper cars={featuredCars} />
          </Suspense>
        </div>
      </section>

      {/* Browse by Make - with priority loading for first few images */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse by Make</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {carMakes.map((make, index) => (
              <Link
                key={make.name}
                href={`/cars?make=${make.name}`}
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer"
              >
                <div className="h-16 w-auto mx-auto mb-2 relative">
                  <Image
                    src={
                      make.imageUrl || `/make/${make.name.toLowerCase()}.webp`
                    }
                    alt={make.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6} // Only prioritize first 6 images
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 className="font-medium">{make.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - simple section, no optimization needed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Test Drive</h3>
              <p className="text-gray-600">
                Book a test drive online in minutes, with flexible scheduling
                options.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Process</h3>
              <p className="text-gray-600">
                Verified listings and secure booking process for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Body Type - lazy load images */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse by Body Type</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                  <Image
                    src={
                      type.imageUrl || `/body/${type.name.toLowerCase()}.webp`
                    }
                    alt={type.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                  <h3 className="text-white text-xl font-bold pl-4 pb-2">
                    {type.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion - lazy loaded */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Suspense
            fallback={
              <div className="h-64 w-full bg-gray-100 rounded animate-pulse"></div>
            }
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Suspense>
        </div>
      </section>

      {/* CTA Section - simple section, no optimization needed */}
      <section className="py-16 dotted-background text-[#0f0f0f]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl text-[#2a2a2a] font-semibold mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect
            vehicle through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
