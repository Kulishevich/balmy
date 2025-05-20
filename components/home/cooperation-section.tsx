"use client";
import Image from "next/image";
import Action from "../action";
import BeardCutImage from "@/public/images/beard-cut.webp";
import { m } from "motion/react";

function CooperationSection() {
  return (
    <section className="mt-[72px] lg:mt-[120px] container flex flex-col lg:flex-row items-center text-center lg:text-left lg:justify-between overflow-x-hidden">
      <m.div
        className="lg:max-w-[410px] will-change-transform"
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 100, x: 0 }}
        transition={{ duration: 0.42, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <p
          className={
            "text-[28px] font-extrabold sm:text-[41px] sm:font-semibold"
          }
        >
          Мы открыты <br /> к сотрудничеству
        </p>
        <p className="mt-6 font-normal">
          Качественные средства по уходу из Испании, Великобритании, Польши и
          ОАЭ по доступным оптовым ценам. Ознакомьтесь с нашим предложением
        </p>
        <Action
          type="link"
          href="/contacts#cooperation"
          className="mt-6 sm:mt-[30px] mx-auto lg:mx-0 max-w-[300px] w-full"
          size="big"
          color="green"
        >
          Сотрудничество
        </Action>
      </m.div>
      <m.div
        className="relative mt-8 lg:mt-0 max-w-[740px] w-full aspect-video rounded-md overflow-hidden will-change-transform"
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 100, x: 0 }}
        transition={{ duration: 0.42, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Image
          className="object-cover"
          src={BeardCutImage}
          alt="стрижка бороды"
          placeholder="blur"
          fill
        />
      </m.div>
    </section>
  );
}

export default CooperationSection;
