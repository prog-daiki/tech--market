import Container from "@/components/container"
import { EditForm } from "./_components/edit-form"
import prisma from "@/lib/db"
import getCurrentUser from "@/app/actions/get-current-user"
import { redirect } from "next/navigation"

const EditPage = async ({ params }: { params: { listingId: string } }) => {
  const listing = await prisma.listing.findUnique({
    where: {
      id: params.listingId
    },
    include: {
      images: true,
    }
  })

  const currentUser = await getCurrentUser();
  if (currentUser?.id !== listing?.userId) {
    redirect("/")
  }

  return (
    <div>
      <Container>
        <div className="px-4 py-8">
          <div className="flex items-center">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl md:text-3xl font-bold">
                商品の情報を編集しよう！
              </h1>
              <span className="text-md md:text-lg text-slate-600 font-semibold">
                商品の情報を入力してください
              </span>
            </div>
          </div>
          <EditForm listing={listing!} />
        </div>
      </Container>
    </div>
  )
}

export default EditPage
