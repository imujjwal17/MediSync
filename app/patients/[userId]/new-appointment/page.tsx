import  AppointmentForm  from "@/components/form/appointment-form";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";

const NewAppointment = async ({ params:{userId}}: SearchParamProps) => {
    const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image
            src="/assets/icons/logo-full.png"
            height={2000} 
            width={2000}   
            alt="patient"
            className="mb-12 h-[150px] w-[400px]"
          />

          <AppointmentForm 
          type="create"
          userId={userId}
          patientId={patient?.$id}
          />
            
        <p className="copyright py-10">
            © 2024 MediSync
        </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[420px] bg-bottom"
      />
    </div>
  );
}
export default NewAppointment