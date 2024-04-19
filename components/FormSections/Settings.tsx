import * as React from 'react';
import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';

import { getFormLabelColor } from '../../utils/style.utils';
import { moqKgSelectValues } from '../../utils/form.utils';

type SettingsProps = {
  register: any;
  watchMoqKg: string;
};

/*
  Settings Needed:

  1) MOQ KG
  2) Commission %
*/

const Settings = ({ register, watchMoqKg }: SettingsProps) => {
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, lg: 1 }}>
      <FormControl id="moqKg">
        <FormLabel color={getFormLabelColor({ hasError: false })}>
          MOQ Kg
        </FormLabel>
        <Select
          name="moqKg"
          bg="white"
          w="100%"
          borderColor="gray.500"
          {...register('moqKg')}
        >
          {moqKgSelectValues.map((value: number | 'Other', i: number) => (
            <option key={`${value}-${i}`} value={value}>
              {value}
            </option>
          ))}
        </Select>
        {watchMoqKg === 'Other' ? (
          <NumberInput min={0} mt={4}>
            <NumberInputField
              name="moqKgOtherValue"
              placeholder="Enter a custom MOQ value."
              bg="white"
              borderColor="gray.500"
              w="100%"
              {...register('moqKgOtherValue', {
                required: 'Please enter a custom MOQ Kg Value',
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        ) : null}
      </FormControl>

      <FormControl id="AMSAPxToAPOrCaMexCostPercentage">
        <FormLabel>AMSA Px To AP or Ca Mex Cost Percentage</FormLabel>
        <NumberInput defaultValue={14} min={0}>
          <NumberInputField
            name="AMSAPxToAPOrCaMexCostPercentage"
            bg="white"
            borderColor="gray.500"
            w="100%"
            {...register('AMSAPxToAPOrCaMexCostPercentage', {
              required:
                'Please enter a value for AMSA Px To AP or Ca Mex Cost Percentage.',
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="APPriceToCustomerPercentage">
        <FormLabel>AP Price to Customer Percentage</FormLabel>
        <NumberInput defaultValue={8} min={0}>
          <NumberInputField
            name="APPriceToCustomerPercentage"
            bg="white"
            borderColor="gray.500"
            w="100%"
            {...register('APPriceToCustomerPercentage', {
              required:
                'Please enter a value for AP Price to Customer Percentage.',
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="commissionPercentage">
        <FormLabel>Commission Percentage</FormLabel>
        <NumberInput defaultValue={0} min={0}>
          <NumberInputField
            name="commissionPercentage"
            bg="white"
            borderColor="gray.500"
            w="100%"
            {...register('commissionPercentage', {
              required: 'Please enter a value for Commission Percentage.',
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </SimpleGrid>
  );
};

export default Settings;
