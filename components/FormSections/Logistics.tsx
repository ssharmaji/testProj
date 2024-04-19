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
import { finalDestinationSelectValues } from '../../utils/form.utils';
import { SelectValue } from '../../domain/SelectValue';

type LogisticsProps = {
  errors: Record<string, any>;
  register: any;
};

const Logistics = ({ errors, register }: LogisticsProps) => {
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, lg: 1 }}>
      <FormControl id="finalDestination">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['finalDestination'] })}
        >
          Final Destination
        </FormLabel>
        <Select
          name="finalDestination"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['finalDestination'],
          })}
          w="100%"
          {...register('finalDestination', {
            required: 'Please select a final destination.',
          })}
        >
          {finalDestinationSelectValues.map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.finalDestination && (
          <FormHelperText color="red.500">
            {errors.finalDestination.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="containerLength">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['containerLength'] })}
        >
          20' or 40' Container
        </FormLabel>
        <Select
          name="containerLength"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['containerLength'],
          })}
          w="100%"
          {...register('containerLength', {
            required: 'Please select a container length.',
          })}
        >
          <option value="20'">20'</option>
          <option value="40'">40'</option>
        </Select>
        {errors.containerLength && (
          <FormHelperText color="red.500">
            {errors.containerLength.message}
          </FormHelperText>
        )}
      </FormControl>
    </SimpleGrid>
  );
};

export default Logistics;
