'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "商品が見つかりませんでした！",
  subtitle = "別の商品も見てみましょう！",
  showReset,
}) => {

  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center ">
      <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
      <p className="font-semibold text-muted-foreground text-sm">{subtitle}</p>
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            variant="outline"
            onClick={() => router.push('/')}
          >検索条件をクリアする
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmptyState
