import { cn } from "@/lib/utils";
import bgImage3 from "@/assets/img-3.jpg";
import bgImage6 from "@/assets/img-6.jpg";
import {
    BookmarkIcon,
    ClockIcon,
    MapPinIcon,
    PencilSquareIcon,
    UserGroupIcon,
    UserIcon
} from "@heroicons/react/20/solid";
import { Button } from "@headlessui/react";
import { ROUTES } from "@/routes/routes";
import { Link, useParams } from "react-router-dom";
import RecipesComments from "@/pages/recipe/components/RecipesComments";
import { useDetailRecipe } from "@/hooks/useRecipe";
import { useAuth } from "@/context/hooks/useAuth";
import {
    useAddRecipeFavourite,
    useRecipeFavouriteByRecipeId,
    useRecipeFavouriteByUser
} from "@/hooks/useRecipeFavourite";
import { toast } from "sonner";
import { formatDate } from "@/utils/utils";
import { useState } from "react";
import Pagination from "@/components/commons/Pagination";

function Recipe() {
    const { user } = useAuth();
    const params = useParams();
    const { id } = params;

    const recipeFavouriteByRecipeIdMutation = useRecipeFavouriteByRecipeId({
        recipeId: id
    });
    const addRecipeFavouriteMutation = useAddRecipeFavourite();

    const detailRecipeMutation = useDetailRecipe(id);

    const {
        title,
        description,
        portion,
        ingredients,
        time,
        cookSteps,
        imageThumb,
        ...detailRecipe
    } = detailRecipeMutation.data || {};
    const { id: recipeFavouriteId } = recipeFavouriteByRecipeIdMutation.data || {};

    const [currentPageFavourite, setCurrentPageFavourite] = useState(1);

    const recipeFavouriteByUserMutation = useRecipeFavouriteByUser({
        page: currentPageFavourite,
        size: 8
    });

    const onPageChangeFavourite = (page) => {
        setCurrentPageFavourite(page);
    };

    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}> 
            <p className={cn("text-[20px] font-bold")}>
                About CookWiki
            </p>
            <span className={cn("text-[16px] font-semibold")}>
                CookWiki's mission is to make cooking more enjoyable every day because we believe that cooking is the key to a happier and healthier life for people, communities, and the planet. We aim to support home cooks worldwide so they can help each other by sharing delicious recipes and cooking experiences.
            </span>

            <div className={cn("bg-center bg-no-repeat bg-cover w-full h-[100px]")}
                 style={{ backgroundImage: `url(${bgImage3})` }}/>
        </div>
    );
}

export default Recipe;
