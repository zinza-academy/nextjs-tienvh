'use client'
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Step1 from './VaccinationRegisterStep1/page';
import StepperItem from '@/components/common/StepperItem';
import NavigationButtons from '@/components/common/NavigationButton';
import Step2 from './VaccinationRegisterStep2/page';

export interface VaccinationRegister {
  priorityGroup: string;
  bhyt: string;
  job: string;
  workplace: string;
  location: string;
  date: Date | null;
  schedule: string;
  agreeToVaccinate?: boolean;
}

const schema = yup.object().shape({
  priorityGroup: yup.string().required("Nhóm ưu tiên không được để trống"),
  bhyt: yup.string(),
  job: yup.string(),
  workplace: yup.string(),
  location: yup.string(),
  date: yup.date().nullable().typeError("Ngày không hợp lệ"),
  schedule: yup.string(),
  agreeToVaccinate: yup.boolean().test('is-agreed-on-step-2', 'Bạn phải đồng ý tiêm chủng để tiếp tục', function (value) {
    const { from } = this as any;
    const step = from && from[0] && from[0].value && from[0].value.step;
    
    if (step === 1) {
      return value === true;
    }
    return true;
  })
});

const defaultValues: VaccinationRegister = {
  priorityGroup: '',
  bhyt: '',
  job: '',
  workplace: '',
  location: '',
  date: null,
  schedule: '',
  // agreeToVaccinate: false,
};

// Fake data
const priorityGroups = [
  { id: 1, name: "Nhóm ưu tiên 1" },
  { id: 2, name: "Nhóm ưu tiên 2" },
  { id: 3, name: "Nhóm ưu tiên 3" },
];

const bhyt = [
  { id: 1, number: "1234567890" },
  { id: 2, number: "1235678940" },
];

const jobs = [
  { id: 1, name: "Bác sĩ" },
  { id: 2, name: "Y tá" },
  { id: 3, name: "Công nhân" },
];

const workPlaces = [
  { id: 1, name: "Bệnh viện A" },
  { id: 2, name: "Cơ quan B" },
  { id: 3, name: "Xí nghiệp C" },
];

const locations = [
  { id: 1, name: "Hà Nội" },
  { id: 2, name: "TP.HCM" },
  { id: 3, name: "Đà Nẵng" },
];

const schedules = [
  { id: 1, time: "Buổi sáng" },
  { id: 2, time: "Buổi chiều" },
];

const steps = [
  'Thông tin cá nhân',
  'Phiếu đồng ý tiêm',
  'Hoàn thành',
];

function RegisterInjection() {
  const [activeStep, setActiveStep] = useState(0);
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<VaccinationRegister>({
    resolver: yupResolver(schema) as any,
    defaultValues,
    context: { step: activeStep }
  });

  const onSubmit: SubmitHandler<VaccinationRegister> = async (data) => {
    handleNextStep();
  };

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    } else {
      handleCancel();
    }
  };
  const handleCancel = () => {
    reset();
  };
  useEffect(() => {
    setValue('step' as any, activeStep, { shouldValidate: true });
  }, [activeStep, setValue]);
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 
          control={control} 
          errors={errors} 
          setValue={setValue}
          priorityGroups={priorityGroups}
          bhyt={bhyt}
          jobs={jobs}
          workPlaces={workPlaces}
          locations={locations}
          schedules={schedules}
        />;
      case 1:
        return <Step2 control={control} errors={errors}  />;  

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepperItem step={activeStep}/>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="xl" sx={{ marginBottom: 80 }}>
          {renderStep()}
          <NavigationButtons
            onBack={handleBackStep}
            onContinue={handleSubmit(onSubmit)}
            isFirstStep={activeStep === 0}
            isLastStep={activeStep === steps.length - 1}
          />
        </Container>
      </Box>

    </form>
  );
}

export default RegisterInjection;
