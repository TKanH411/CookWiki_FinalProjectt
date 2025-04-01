import { cn } from "@/lib/utils";
import bgImage3 from "@/assets/img-3.jpg";
import bgImage6 from "@/assets/img-6.jpg";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import Pagination from "@/components/commons/Pagination";
import { useState } from "react";
import { useRecipe } from "@/hooks/useRecipe";
import { useMyRecipes } from "@/hooks/useRecipe";
import { useRecipeFavouriteByUser } from "@/hooks/useRecipeFavourite";
import { useStatusRecipe } from "@/hooks/useRecipe"; // Import the renamed hook
import { parseColorStatus, STATUS_LIST } from "@/utils/string";

function SaveFood() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFavourite, setCurrentPageFavourite] = useState(1);
  const [currentPageMyRecipes, setCurrentPageMyRecipes] = useState(1);

  const recipeFavouriteByUserMutation = useRecipeFavouriteByUser({
    page: currentPageFavourite,
    size: 8,
  });

  const recipeMutation = useRecipe({
    page: currentPage,
    size: 12,
  });

  const myRecipesMutation = useMyRecipes(currentPageMyRecipes, 8);

  // Hook to change recipe status
  const statusRecipeMutation = useStatusRecipe();

  const onPageChange = (page) => setCurrentPage(page);
  const onPageChangeFavourite = (page) => setCurrentPageFavourite(page);
  const onPageChangeMyRecipes = (page) => setCurrentPageMyRecipes(page);

  // Determine the color for the status
  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500"; // Green
      case "DRAFT":
        return "bg-gray-500"; // Gray
      case "REJECTED":
        return "bg-red-500"; // Red
      default:
        return "bg-gray-300"; // Default color
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
      {/* User's Recipe List */}
      <div className={cn("flex flex-col w-full justify-start border-b border-dashed border-gray-300 pb-5 gap-3")}>
        <p className={cn("flex text-[26px] font-semibold text-[rgba(96,96,96,0.9)]")}>
          Kho món ngon của bạn
        </p>
        <div>
          <Pagination
            currentPage={currentPageMyRecipes}
            totalPage={myRecipesMutation.data?.totalPages}
            onPageChange={onPageChangeMyRecipes}
          />
        </div>
        <div className={cn("grid grid-cols-4 gap-4")}>
          {myRecipesMutation.data?.recipes?.map((item, idx) => (
            <Link
              key={idx}
              className={cn("shadow-md rounded-lg flex flex-col")}
              to={ROUTES.RECIPE.replace(":id", item.id)}
            >
              <div className={cn("relative")}>
                <img
                  src={item.imageThumb || bgImage6}
                  alt=""
                  className={cn("rounded-t-[10px] w-full h-[230px]")}
                />
                <div
                  className={cn(
                    "absolute bottom-0 w-full py-4 px-2 text-[20px] leading-none font-semibold text-white bg-[rgba(74,74,74,0.4)]"
                  )}
                >
                  <p className={cn("line-clamp-2")}>{item.title}</p>
                </div>
              </div>
              <div
                className={cn(
                  "p-2 grow flex flex-col justify-between bg-[rgba(255,255,255,0.8)] text-[rgba(96,96,96,0.9)]"
                )}
              >
                <p className={cn("text-[16px] font-semibold line-clamp-3")}>
                  {item.description}
                </p>
                <div className={cn("text-[16px] font-semibold flex items-center pt-2")}>
                  <UserIcon className={cn("size-5 mr-2 fill-black")} />
                  <p className={cn("line-clamp-1")}>{item.user?.email}</p>
                </div>

                {/* Display status with background color and styling */}
                <div
                  className={cn(
                    "text-[14px] font-semibold py-1 px-3 rounded-full text-white text-center",
                    getStatusColor(item.status)
                  )}
                >
                  {item.status || "Chưa xác định"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Favorite Recipes */}
      <div className={cn("flex flex-col w-full justify-start border-b border-dashed border-gray-300 pb-5 gap-3")}>
        <p className={cn("flex text-[26px] font-semibold text-[rgba(96,96,96,0.9)]")}>
          Công thức yêu thích
        </p>
        <div>
          <Pagination
            currentPage={currentPageFavourite}
            totalPage={recipeFavouriteByUserMutation.data?.totalPages}
            onPageChange={onPageChangeFavourite}
          />
        </div>
        <div className={cn("grid grid-cols-4 gap-4")}>
          {recipeFavouriteByUserMutation.data?.recipes?.map((item, idx) => (
            <Link
              key={idx}
              className={cn("shadow-md rounded-lg flex flex-col")}
              to={ROUTES.RECIPE.replace(":id", item?.recipe?.id)}
            >
              <div className={cn("relative")}>
                <img
                  src={item?.recipe?.imageThumb || bgImage6}
                  alt=""
                  className={cn("rounded-t-[10px] w-full h-[230px]")}
                />
                <div
                  className={cn(
                    "absolute bottom-0 w-full py-4 px-2 text-[20px] leading-none font-semibold text-white bg-[rgba(74,74,74,0.4)]"
                  )}
                >
                  <p className={cn("line-clamp-2")}>{item?.recipe?.title}</p>
                </div>
              </div>
              <div
                className={cn(
                  "p-2 grow flex flex-col justify-between bg-[rgba(255,255,255,0.8)] text-[rgba(96,96,96,0.9)]"
                )}
              >
                <p className={cn("text-[16px] font-semibold line-clamp-3")}>
                  {item?.recipe?.description}
                </p>
                <div className={cn("text-[16px] font-semibold flex items-center pt-2")}>
                  <UserIcon className={cn("size-5 mr-2 fill-black")} />
                  <p className={cn("line-clamp-1")}>{item?.recipe?.user?.email}</p>
                </div>

                {/* Display status with background color and styling */}
                <div
                  className={cn(
                    "text-[14px] font-semibold py-1 px-3 rounded-full text-white text-center",
                    getStatusColor(item?.recipe?.status)
                  )}
                >
                  {item?.recipe?.status || "Chưa xác định"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Introduction */}
      <p className={cn("text-[20px] font-bold")}>About Cookpad</p>
      <span className={cn("text-[16px] font-semibold")}>
        Cookwiki's mission is to make cooking more enjoyable every day because we
        believe that cooking is the key to a happier and healthier life for people,
        communities, and the planet. We aim to support home cooks around the world by
        helping them share delicious recipes and cooking experiences.
      </span>

      <div
        className={cn("bg-center bg-no-repeat bg-cover w-full h-[100px]")}
        style={{ backgroundImage: `url(${bgImage3})` }}
      />
    </div>
  );
}

export default SaveFood;