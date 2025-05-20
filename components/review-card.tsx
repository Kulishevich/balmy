import Image from "next/image";
import Link from "next/link";
import AvatarImage from "@/public/images/avatar.webp";
import StarIcon from "@/public/icons/start.svg";

const review = {
  name: "Анна",
  avatar: AvatarImage,
  date: "11.11.2024",
  stars: 5,
  title: "Шикарный сервис!",
  text: "Уже давно пользуюсь услугами Вашего магазина и буду по-прежнему им пользоваться. Очень большой ассортимент товаров различного направления, простое и понятное оформление",
};

function ReviewCard() {
  const { name, avatar, date, stars, title, text } = review;
  const starsArray = Array.from({ length: stars });

  return (
    <Link className="flex flex-col max-w-[300px] w-full p-5 border border-dark-gray rounded-[5px]" href="/">
      <div className='flex'>
        <div className="relative w-12 h-12 rounded-full">
          <Image
            className="object-cover"
            src={avatar}
            alt="аватар"
            placeholder="blur"
            fill
          />
        </div>
        <div className='ml-3 flex flex-col'>
          <span className='font-semibold'>{name}</span>
          <span className='text-[14px] font-normal text-dark-gray/70'>{date}</span>
        </div>
      </div>
      <div className='mt-4 flex gap-1'>
        {starsArray.map((_, idx) => {
          return <StarIcon key={idx} />;
        })}
      </div>
      <h3 className='mt-4 font-bold'>{title}</h3>
      <p className='mt-[6px] font-normal'>{text}</p>
      <span className='inline-block mt-auto pt-[25px] text-[15px] font-medium text-dark-gray/70'>Читать весь отзыв</span>
    </Link>
  );
}

export default ReviewCard;
