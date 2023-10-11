import Container from "@/components/container"
import { ListingForm } from "./_components/listing-form"

const CreatePage = () => {
  return (
    <div>
      <Container>
        <div className="px-4 py-8">
          <div className="flex items-center">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl md:text-3xl font-bold">
                tech marketに商品を出品しよう！
              </h1>
              <span className="text-md md:text-lg text-slate-600 font-semibold">
                商品の情報を入力してください
              </span>
            </div>
          </div>
          <ListingForm />
        </div>
      </Container>
    </div>
  )
}

export default CreatePage
