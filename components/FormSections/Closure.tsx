import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';

import {
  getFormLabelColor,
  getFormInputBorderColor,
} from '../../utils/style.utils';
import { ezOpenTapeSelectValues } from '../../utils/form.utils';
import { SelectValue } from '../../domain/SelectValue';

type ClosureProps = {
  errors: Record<string, any>;
  register: any;
  selectedBagStyle: string;
};

const Closure = ({ errors, register, selectedBagStyle }: ClosureProps) => {
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, lg: 1 }}>
      <FormControl id="ezOpenTape">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['ezOpenTape'] })}
        >
          EZ Open Tape
        </FormLabel>
        <Select
          name="ezOpenTape"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['ezOpenTape'],
          })}
          w="100%"
          {...register('ezOpenTape', {
            required: 'Please select an EZ Open Tape.',
          })}
        >
          {ezOpenTapeSelectValues.map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.ezOpenTape && (
          <FormHelperText color="red.500">
            {errors.ezOpenTape.message}
          </FormHelperText>
        )}
      </FormControl>

      {selectedBagStyle === 'Standard' ? (
        <>
          <FormControl id="threadColor">
            <FormLabel
              color={getFormLabelColor({ hasError: errors['threadColor'] })}
            >
              Thread Color
            </FormLabel>
            <Input
              name="threadColor"
              bg="white"
              borderColor={getFormInputBorderColor({
                hasError: errors['threadColor'],
              })}
              {...register(
                'threadColor',
                selectedBagStyle === 'Standard'
                  ? { required: 'Please enter a thread color.' }
                  : {}
              )}
            />
            {errors.threadColor && (
              <FormHelperText color="red.500">
                {errors.threadColor.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl id="ezOpenColor">
            <FormLabel
              color={getFormLabelColor({ hasError: errors['ezOpenColor'] })}
            >
              EZ Open Color
            </FormLabel>
            <Input
              name="ezOpenColor"
              bg="white"
              borderColor={getFormInputBorderColor({
                hasError: errors['ezOpenColor'],
              })}
              {...register(
                'ezOpenColor',
                selectedBagStyle === 'Standard'
                  ? {
                      required: 'Please enter an EZ Open Color.',
                    }
                  : {}
              )}
            />
            {errors.ezOpenColor && (
              <FormHelperText color="red.500">
                {errors.ezOpenColor.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl id="tapeColor">
            <FormLabel
              color={getFormLabelColor({ hasError: errors['tapeColor'] })}
            >
              Tape Color
            </FormLabel>
            <Input
              name="tapeColor"
              bg="white"
              borderColor={getFormInputBorderColor({
                hasError: errors['tapeColor'],
              })}
              {...register(
                'tapeColor',
                selectedBagStyle === 'Standard'
                  ? {
                      required: 'Please enter a tape color.',
                    }
                  : {}
              )}
            />
            {errors.tapeColor && (
              <FormHelperText color="red.500">
                {errors.tapeColor.message}
              </FormHelperText>
            )}
          </FormControl>
        </>
      ) : null}
    </SimpleGrid>
  );
};

export default Closure;
