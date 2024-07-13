"use client";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { toast } from "react-toastify";

export default function AddToWishlist({ productId }: { productId: string }) {
  const user = useAuth((state) => state.user);
  const getUser = useAuth((state) => state.getUser);
  const addToWishes = useWishlist((state) => state.addToWishes);
  const router = useRouter();
  const handleAdd = async () => {
    if (!user) {
      toast.error("شما لاگین نیستید");
      router.push("/login-register");
      return;
    }
    try {
      await addToWishes({ user: user._id, product: productId });
      toast.success("محصول به علاقه مندی ها اضافه شد");
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error - (${error.response.status}) :  ${error.response.data.message}`
        );
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div onClick={handleAdd}>
      <CiHeart />
      <p>افزودن به علاقه مندی ها</p>
    </div>
  );
}
