import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';

import {
  getFormLabelColor,
  getFormInputBorderColor,
} from '../../utils/style.utils';
import {
  extrudateGSMSelectValues,
  fabricColorSelectValues,
  fabricGSMSelectValues,
  fabricSupplierSelectValues,
} from '../../utils/form.utils';
import { SelectValue } from '../../domain/SelectValue';

type FabricAndLaminationProps = {
  errors: Record<string, any>;
  register: any;
};

const FabricAndLamination = ({
  errors,
  register,
}: FabricAndLaminationProps) => {
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, lg: 1 }}>
      <FormControl id="fabricGSM">
        <FormLabel color={getFormLabelColor({ hasError: errors['fabricGSM'] })}>
          Fabric GSM
        </FormLabel>
        <Select
          name="fabricGSM"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['fabricGSM'],
          })}
          w="100%"
          {...register('fabricGSM', {
            required: 'Please select a Fabric GSM.',
          })}
        >
          {fabricGSMSelectValues.map((fabricGSM: number, i: number) => (
            <option key={`${fabricGSM}-${i}`} value={fabricGSM}>
              {fabricGSM}
            </option>
          ))}
        </Select>
        {errors.fabricGSM && (
          <FormHelperText color="red.500">
            {errors.fabricGSM.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="extrudateGSM">
        <FormLabel
          color={getFormLabelColor({
            hasError: errors['extrudateGSM'],
          })}
        >
          Extrudate GSM
        </FormLabel>
        <Select
          name="extrudateGSM"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['extrudateGSM'],
          })}
          w="100%"
          {...register('extrudateGSM', {
            required: 'Please select an Extrudate GSM.',
          })}
        >
          {extrudateGSMSelectValues.map((extrudateGSM: number, i: number) => (
            <option key={`${extrudateGSM}-${i}`} value={extrudateGSM}>
              {extrudateGSM}
            </option>
          ))}
        </Select>
        {errors.extrudateGSM && (
          <FormHelperText color="red.500">
            {errors.extrudateGSM.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="fabricColor">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['fabricColor'] })}
        >
          Fabric Color
        </FormLabel>
        <Select
          name="fabricColor"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['fabricColor'],
          })}
          w="100%"
          {...register('fabricColor', {
            required: 'Please select a fabric color',
          })}
        >
          {fabricColorSelectValues.map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.fabricColor && (
          <FormHelperText color="red.500">
            {errors.fabricColor.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="fabricSupplier">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['fabricSupplier'] })}
        >
          Fabric Supplier
        </FormLabel>
        <Select
          name="fabricSupplier"
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['fabricSupplier'],
          })}
          w="100%"
          {...register('fabricSupplier', {
            required: 'Please select a fabric supplier.',
          })}
        >
          {fabricSupplierSelectValues.map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.fabricSupplier && (
          <FormHelperText color="red.500">
            {errors.fabricSupplier.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="specialLamination">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['specialLamination'] })}
        >
          Special Lamination?
        </FormLabel>
        <Select
          name="specialLamination"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['specialLamination'],
          })}
          w="100%"
          {...register('specialLamination', {
            required: 'Please select a special lamination.',
          })}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
        {errors.specialLamination && (
          <FormHelperText color="red.500">
            {errors.specialLamination.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="uvTreatment">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['uvTreatment'] })}
        >
          UV Treatment
        </FormLabel>
        <Select
          name="uvTreatment"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['uvTreatment'],
          })}
          w="100%"
          {...register('uvTreatment', {
            required: 'Please select a UV Treatment.',
          })}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
        {errors.uvTreatment && (
          <FormHelperText color="red.500">
            {errors.uvTreatment.message}
          </FormHelperText>
        )}
      </FormControl>
    </SimpleGrid>
  );
};

export default FabricAndLamination;
