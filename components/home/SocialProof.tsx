import { Makers } from "@/config/makers";
import Image from "next/image";

const SocialProof = ({ locale }: { locale: any }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-10 pt-8">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center justify-center">
          {Makers.map((user, index) => {
            return (
              <Image
                key={index}
                src={user.image}
                alt="User"
                height={40}
                width={40}
                className="rounded-full -m-[5px] border border-white"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
