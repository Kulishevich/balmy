import Image from "next/image";
import Title from "../title";
import InstagramPostImage from "@/public/images/instagram-post.webp";
import Link from "next/link";
import SectionAnimationWrapper from "../section-animation-wrapper";

async function InstagramSection() {
  const instagramPosts = Array.from({ length: 4 });

  return (
    <SectionAnimationWrapper>
      <section className="mt-[72px] lg:mt-[120px] container">
        <Title className="text-center">Instagram</Title>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {instagramPosts.map((_, idx) => {
            return (
              <Link
                key={idx}
                className="relative lg:max-w-[300px] w-full aspect-square rounded-[5px] overflow-hidden group"
                href="https://www.instagram.com/balmy.hb"
                target="_blank"
              >
                <Image
                  className="object-cover"
                  src={InstagramPostImage}
                  alt="инстаграм пост"
                  fill
                />
                <div className="flex flex-col absolute inset-0 bg-light-gray border border-dark-gray/30 rounded-[5px] p-5 transition opacity-0 group-hover:opacity-100">
                  <p className="font-normal">
                    Подпишитесь на наш Instagram и будьте в курсе наших акций
                    <br /> и новинок
                  </p>
                  <span className="mt-auto text-[21px]">@balmy.hb</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SectionAnimationWrapper>
  );
}

export default InstagramSection;
