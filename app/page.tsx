import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return(
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.png"
            height={2000} 
            width={2000}   
            alt="patient"
            className="mb-12 h-[100px] w-[300px]"
          />

          <PatientForm/>
          <div className="text-14-regular mt-20 flex justify-between ">
            <p className="justify-items-end text-dark-600 xl:text-left ">
              © 2024 MediSync
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image 
            src="/assets/images/onboard-img.jpg"
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[50%]"
            />
    </div>
  )
}
