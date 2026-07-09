"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SVGPlaceholder } from "@/components/shared/SVGPlaceholder";
import { siteInfo } from "@/data/placeholder/site";

const ACCENT_PANELS = ["hero-fields", "hero-milk", "hero-sunrise"];

export function Hero() {
  return (
    <section className="relative -mt-20 flex h-[92vh] min-h-[560px] w-full items-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Base layer is always fully visible so the hero is never blank mid-crossfade */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <SVGPlaceholder seed="hero-cows" className="h-full w-full" />
        </motion.div>

        {ACCENT_PANELS.map((seed, i) => (
          <motion.div
            key={seed}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: [0, 0.85, 0.85, 0], scale: [1.05, 1.18, 1.18, 1.3] }}
            transition={{
              duration: 24,
              times: [0, 0.15, 0.8, 1],
              repeat: Infinity,
              delay: i * 8,
              ease: "easeInOut",
            }}
          >
            <SVGPlaceholder seed={seed} className="h-full w-full" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="font-button text-sm font-medium uppercase tracking-widest text-gold">
            {siteInfo.address.city}, {siteInfo.address.state}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-5 font-sans text-lg text-white/90">
            {siteInfo.subtagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link href="/products" />}
              size="lg"
              className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
            >
              Shop Products
            </Button>
            <Button
              render={<Link href="/products#subscribe" />}
              size="lg"
              variant="outline"
              className="border-white/60 bg-white/10 font-button text-white hover:bg-white/20"
            >
              Subscribe Daily
            </Button>
            <Button
              render={<Link href="/contact" />}
              size="lg"
              variant="ghost"
              className="font-button text-white hover:bg-white/10"
            >
              Book Farm Visit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
