import VisaImage from "@/public/images/visa.webp";
import VisaverifiedImage from "@/public/images/visaverified.webp";
import MastercardImage from "@/public/images/mastercard.webp";
import MastercardsecureImage from "@/public/images/mastercardsecure.webp";
import EripImage from "@/public/images/erip.webp";
import WebpayImage from "@/public/images/webpay.webp";
import BelcardImage from "@/public/images/belcard.webp";
import BelcardsecureImage from "@/public/images/belcardsecure.webp";
import Image from "next/image";

const payments = [
  { id: 0, image: VisaImage },
  { id: 1, image: VisaverifiedImage },
  { id: 2, image: MastercardImage },
  { id: 3, image: MastercardsecureImage },
  { id: 4, image: EripImage },
  { id: 5, image: WebpayImage },
  { id: 6, image: BelcardImage },
  { id: 7, image: BelcardsecureImage },
];

function Payments() {
  return (
    <div className="mt-6 mx-auto flex flex-wrap justify-center gap-x-10 gap-y-5">
      {payments.map((payment) => {
        return (
          <Image
            className="object-contain grayscale contrast-50 transition hover:grayscale-0 hover:contrast-100"
            key={payment.id}
            src={payment.image}
            alt="оплата"
            height={34}
          />
        );
      })}
    </div>
  );
}

export default Payments;
