import React from 'react'
import Image from 'next/image'
import  RegisterForm  from '@/components/form/register-form';
import { getPatient, getUser } from '@/lib/actions/patient.action'
import { redirect } from 'next/navigation'
const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);
  if (patient) redirect(`/patients/${userId}/register/new-appointment`);
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image
          src="/assets/icons/logo-full.png"
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-[150px] w-[400px]"
        />

        <RegisterForm user={user}/>
        <p className="copyright py-10">
            © 2024 MediSync
        </p>
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
  )
}

export default Register
