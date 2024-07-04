'use client';
import { Box, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Controller, FieldErrors } from 'react-hook-form';
import { Control } from 'react-hook-form';
import { VaccinationRegister } from '../page';

interface Step2Props {
  control: Control<VaccinationRegister>;
  errors: FieldErrors<VaccinationRegister>;
}
function Step2({ control, errors }: Step2Props) {
  return (
    <Box  sx= {{ display:'flex',flexDirection:'column', gap:'16px',marginX:'36px' }}>
      <Box sx={{display:'flex', flexDirection:'row', gap: '10px',alignItems:'center'}}>
      <Image
             src="/img/shield_1.png"
             alt="shield"
             width={24}
             height={24}
          />
        <Typography variant='body1' style={{padding:'12px 0'}}>
        1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh.
         Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy định.
          </Typography>  
      </Box>
      <Box sx={{display:'flex', flexDirection:'row', gap: '10px',alignItems:'center'}}>
      <Image
             src="/img/vaccine2.png"
             alt="vaccine_2"
             width={24}
             height={24}
          />
        <Typography variant='body1' style={{padding:'12px 0'}}>
        2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng,
         đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.
          </Typography>  
      </Box>
      <Box sx={{display:'flex', flexDirection:'row', gap: '10px',alignItems:'center'}}>
      <Image
             src="/img/hospital_1.png"
             alt="hospital"
             width={24}
             height={24}
          />
        <Typography variant='body1' style={{padding:'12px 0'}}>
        3. Khi có triệu chứng bất thường về sức khỏe,
         người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị kịp thời.
          </Typography>  
      </Box>

      <Divider sx={{ height: '2px', flex: 1, backgroundColor: '#EEEEEE' }} />
      <Box sx={{paddingX:'10.5px'}}>
        <Typography variant='body1' style={{ paddingRight: '10px' }}>Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ và: </Typography>
        <Controller
          name="agreeToVaccinate"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Đồng ý tiêm chủng"
            />
          )}
        />
        {errors.agreeToVaccinate && (
        <Typography color="error">
          {errors.agreeToVaccinate.message}
        </Typography>
      )}
      </Box>
    </Box>
  )
}

export default Step2
