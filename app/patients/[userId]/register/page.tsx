import { RegisterForm } from "@/components/form/register-form";
import { getUser } from "@/lib/actions/patient-action";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";

const UserRegistrationPage = async ({
  params: { userId },
}: SearchParamProps) => {
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.png"
            height={2000} 
            width={2000}   
            alt="patient"
            className="mb-12 h-[150px] w-[400px]"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[500px]"
      />
    </div>
  );
};

export default UserRegistrationPage;
