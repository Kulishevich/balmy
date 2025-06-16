// import { getCategories } from "@/api/category";
import Action from "@/components/action";
import NotFoundIcon from "@/public/icons/404.svg";

async function NotFoundPage() {
  // const { categories } = await getCategories();

  return (
    <div className="container relative flex flex-col items-center my-auto lg:mt-[120px] mt-[300px] max-w-[824px] mx-auto">
      <NotFoundIcon className="-translate-y-full lg:translate-y-0 lg:top-0 top-16 absolute scale-50 lg:relative lg:scale-100" />
      <p className="text-center text-[18px] lg:text-[26px]">
        К сожалению, страница не найдена. Возможно, она была удалена или Вы
        ввели некорректный адрес.
      </p>
      <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row gap-3 mx-auto max-w-[300px] lg:max-w-full w-full justify-center">
        <Action
          type="link"
          href="/"
          className="max-w-[300px] w-full"
          size="big"
          color="white"
        >
          Перейти на главную
        </Action>
        {/* <Action
          type="link"
          href={`/catalog/${categories[1].slug}`}
          className="max-w-[300px] w-full"
          size="big"
          color="green"
        >
          Перейти в каталог
        </Action> */}
      </div>
    </div>
  );
}

export default NotFoundPage;
