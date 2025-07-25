import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import Image from "next/image";
import TallArrowRightIcon from "@/public/icons/tall-arrow-right.svg";

async function NewsPage() {
  return (
    <div className="container items-center">
      <Title type="h1" className="mt-10 text-center">
        Как у звезды: форма бороды и усов, которые тебе подойдут, и советы по
        уходу за ними
      </Title>
      <Breadcrumbs className="mt-6 mx-auto" />
      <p className="mt-[16px] text-center font-normal text-[17px] mb-8 mx-auto max-w-[850px]">
        Обращали ли вы когда-либо внимание на то, как выглядят знаменитые
        бородачи, например, Джордж Клуни или Дэвид Бэкхэм?
      </p>
      <p className="bg-gold w-fit py-[2px] px-[10px] mb-[45px] rounded-[14px] mx-auto">
        11.08.2024
      </p>
      <div className="flex justify-between w-full">
        <div className="w-[850px] flex flex-col gap-12">
          <div className="flex flex-col gap-6 w-full">
            <h3 className="text-[26px] font-semibold">
              Роберт Дауни-младший и его борода в форме якоря
            </h3>
            <div className="relative w-full h-[380px]">
              <Image
                src={"/images/news-robert.png"}
                fill
                alt="news"
                className="object-cover rounded-[5px]"
              />
            </div>
            <p className="text-[17px] font-normal">
              Борода актера имеет ярко выраженную форму якоря. И, признаемся,
              она ему идет. Видите себя в таком же образе? Щетина имеет прямые
              и четкие линии: основная часть волос — на подбородке, которая
              плавно переходит в тонкую линию волос-усов. Такая форма бороды
              как бы удлиняет подбородок и нижнюю челюсть. Если вы обладатель
              квадратной, круглой или овальной формы лица, тогда это — ваш
              вариант.
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <h3 className="text-[26px] font-semibold">
              Роберт Дауни-младший и его борода в форме якоря
            </h3>
            <div className="relative w-full h-[380px]">
              <Image
                src={"/images/news-robert.png"}
                fill
                alt="news"
                className="object-cover rounded-[5px]"
              />
            </div>
            <p className="text-[17px] font-normal">
              Борода актера имеет ярко выраженную форму якоря. И, признаемся,
              она ему идет. Видите себя в таком же образе? Щетина имеет прямые
              и четкие линии: основная часть волос — на подбородке, которая
              плавно переходит в тонкую линию волос-усов. Такая форма бороды
              как бы удлиняет подбородок и нижнюю челюсть. Если вы обладатель
              квадратной, круглой или овальной формы лица, тогда это — ваш
              вариант.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[301px]">
          <p className="text-[36px] font-bold text-center mb-9">
            Другие новости этого автора
          </p>
          <div className="flex flex-col gap-6">
            <div className="news-item text-black">
              <div className="relative h-[258px]">
                <Image
                  src={"/images/news-robert.png"}
                  fill
                  alt="other news"
                  className="object-cover rounded-[5px]"
                />
              </div>
              <div className="flex flex-col gap-6 px-5 py-4">
                <p className="text-[20px] font-medium">
                  Духи, туалетная вода или одеколон — что выберете вы?
                </p>
                <p className="text-[15px] font-normal">
                  Согласитесь, было такое: ваш знакомый или близкий вам человек
                  пользуется...
                </p>
                <button className="flex items-center gap-[6px] font-semibold text-[19px]">
                  Подробнее
                  <TallArrowRightIcon />
                </button>
              </div>
            </div>

            <div className="news-item text-black">
              <div className="relative h-[258px]">
                <Image
                  src={"/images/news-robert.png"}
                  fill
                  alt="other news"
                  className="object-cover rounded-[5px]"
                />
              </div>
              <div className="flex flex-col gap-6 px-5 py-4">
                <p className="text-[20px] font-medium">
                  Духи, туалетная вода или одеколон — что выберете вы?
                </p>
                <p className="text-[15px] font-normal">
                  Согласитесь, было такое: ваш знакомый или близкий вам человек
                  пользуется...
                </p>
                <button className="flex items-center gap-[6px] font-semibold text-[19px]">
                  Подробнее
                  <TallArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
