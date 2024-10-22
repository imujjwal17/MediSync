"use client";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/custom-form-feild";
import SubmitButton from "@/components/submit-button";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {getAppointmentSchema } from "@/lib/validation";
const newDate = () => new Date();
import "react-datepicker/dist/react-datepicker.css";
import { createAppointment } from "@/lib/actions/appointment.actions";
const AppointmentForm = ({
    userId,
    patientId,
    type = "create",
  }: {
    userId: string;
    patientId: string;
    type: "create" | "cancel" | "schedule";
  }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const AppointmentFormValidation = getAppointmentSchema(type);
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
        primaryPhysician: "",
        schedule: newDate(),
        reason: "",
        note: "",
        cancellationReason: "",
      },
    });
  
    const onSubmit = async (
      values: z.infer<typeof AppointmentFormValidation>
    ) => {
      setIsLoading(true);
      let status;
      switch (type) {
        case "schedule":
          status = "scheduled";
          break;
        case "cancel":
          status = "canceled";
          break;
        default:
          status = "pending";
          break;
      }
      try {
        if (type === "create" && patientId) {
          const appointmentData = {
            userId,
            patient: patientId,
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason!,
            note: values.note,
            status: status as Status,
          };
          const newAppointment = await createAppointment(appointmentData);
          console.log('Appointment created:', newAppointment);
          if (newAppointment) {
            form.reset();
            router.push(
              `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
            );
          }
        }
      } catch (error) {
        console.error(error); // Add error handling
      }
    };
  
    let buttonLabel;
    switch (type) {
      case "schedule":
        buttonLabel = "Schedule Appointment";
        break;
      case "cancel":
        buttonLabel = "Cancel Appointment";
        break;
      case "create":
        buttonLabel = "Create Appointment";
        break;
      default:
        break;
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request an appointment in 10 seconds</p>
          </section>
          {type !== "cancel" && (
            <>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor Select"
                placeholder="Select a Doctor"
              >
                {Doctors.map((doctor) => (
                  <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.image}
                        height={32}
                        width={32}
                        alt={doctor.name}
                        className="rounded-full border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - h:mm aa"
              />
              <div className="flex flex-col xl:flex-row gap-6">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="Enter reason for appointment"
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Notes"
                  placeholder="Enter Notes"
                />
              </div>
            </>
          )}
          {type === "cancel" && (
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for Cancellation"
              placeholder="Enter Reason for Cancellation"
            />
          )}
          <SubmitButton
            isLoading={isLoading}
            className={`${
              type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
            } w-full`}
          >
            {buttonLabel}
          </SubmitButton>
        </form>
      </Form>
    );
  };
  
  export default AppointmentForm;
  