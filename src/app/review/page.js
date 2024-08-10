import ReviewCard from "@/components/ReviewCard/ReviewCard";

const page = () => {
  return (
    <div className="pt-10">
      <h1>this is review page</h1>
      <div className="grid grid-cols-3 gap-5">
        <ReviewCard></ReviewCard>
      </div>
    </div>
  );
};

export default page;
