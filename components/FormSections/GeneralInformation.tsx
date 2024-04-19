// @ts-nocheck
import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Select,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import {
  getFormLabelColor,
  getFormInputBorderColor,
} from '../../utils/style.utils';
import {
  closedEndSelectValues,
  openEndSelectValues,
} from '../../utils/form.utils';
import { SelectValue } from '../../domain/SelectValue';

type GeneralInformationProps = {
  control: any;
  desiredDeliveryDate: Date;
  desiredDeliveryDateVal: Date;
  errors: Record<string, any>;
  orderDate: Date;
  register: any;
  selectedBagStyle: string;
};

const GeneralInformation = ({
  control,
  desiredDeliveryDate,
  desiredDeliveryDateVal,
  errors,
  orderDate,
  register,
  selectedBagStyle,
}: GeneralInformationProps) => {
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, lg: 1 }}>
      <FormControl id="quoteName">
        <FormLabel color={getFormLabelColor({ hasError: errors['quoteName'] })}>
          Quote Name
        </FormLabel>
        <Input
          name="quoteName"
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['quoteName'],
          })}
          {...register('quoteName')}
        />
        {errors.quoteName && (
          <FormHelperText color="red.500">
            {errors.quoteName.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl id="orderDate">
        <FormLabel color={getFormLabelColor({ hasError: errors['orderDate'] })}>
          Order Date
        </FormLabel>
        <Controller
          control={control}
          name="orderDate"
          rules={{ required: 'Please select an order date.' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <DatePicker
                className="w-full"
                name="orderDate"
                placeholderText="Select Date"
                selected={value}
                autoComplete="off"
                onChange={onChange}
                onBlur={onBlur}
                minDate={new Date()}
                startDate={orderDate}
                customInput={
                  <Input
                    bg="white"
                    borderColor={getFormInputBorderColor({
                      hasError: errors['orderDate'],
                    })}
                  />
                }
              />
              {errors.orderDate && (
                <FormHelperText color="red.500">
                  {errors.orderDate.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>

      <FormControl id="bagStyle">
        <FormLabel color={getFormLabelColor({ hasError: errors['bagStyle'] })}>
          Bag Style
        </FormLabel>
        <Select
          name="bagStyle"
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['bagStyle'],
          })}
          w="100%"
          {...register('bagStyle', {
            required: 'Please select a bag style.',
            validate: (value: string) =>
              value !== 'Default' || 'Please select a bag style.',
          })}
        >
          <option value="Default">Please select...</option>
          <option value="Standard">Standard</option>
          <option value="Step Cut">Step Cut</option>
        </Select>
        {errors.bagStyle && (
          <FormHelperText color="red.500">
            {errors.bagStyle.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="desiredDeliveryDate">
        <FormLabel
          color={getFormLabelColor({
            hasError: errors['desiredDeliveryDate'],
          })}
        >
          Desired Delivery Date
        </FormLabel>
        <Controller
          control={control}
          name="desiredDeliveryDate"
          rules={{ required: 'Please select a delivery date.' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <DatePicker
                className="w-full"
                name="desiredDeliveryDate"
                placeholderText="Select Date"
                selected={value}
                autoComplete="off"
                onChange={onChange}
                onBlur={onBlur}
                minDate={desiredDeliveryDateVal}
                startDate={desiredDeliveryDateVal}
                customInput={
                  <Input
                    bg="white"
                    borderColor={getFormInputBorderColor({
                      hasError: errors['desiredDeliveryDate'],
                    })}
                  />
                }
              />
              {errors.desiredDeliveryDate && (
                <FormHelperText color="red.500">
                  {errors.desiredDeliveryDate.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>

      <FormControl id="openEnd">
        <FormLabel color={getFormLabelColor({ hasError: errors['openEnd'] })}>
          Open End
        </FormLabel>
        <Select
          name="openEnd"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({ hasError: errors['openEnd'] })}
          w="100%"
          {...register('openEnd', {
            required: ' Please select an open end.',
          })}
        >
          {openEndSelectValues[selectedBagStyle].map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.openEnd && (
          <FormHelperText color="red.500">
            {errors.openEnd.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="estimatedOrderQty">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['estimatedOrderQty'] })}
        >
          Estimated Order Qty
        </FormLabel>
        <NumberInput min={0}>
          <NumberInputField
            name="estimatedOrderQty"
            bg="white"
            borderColor={getFormInputBorderColor({
              hasError: errors['estimatedOrderQty'],
            })}
            w="100%"
            {...register('estimatedOrderQty', {
              required: 'Please enter an estimated order quantity',
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {errors.estimatedOrderQty && (
          <FormHelperText color="red.500">
            {errors.estimatedOrderQty.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="closedEnd">
        <FormLabel color={getFormLabelColor({ hasError: errors['closedEnd'] })}>
          Closed End
        </FormLabel>
        <Controller
          control={control}
          name="closedEnd"
          rules={{ required: 'Please select a closed end.' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              name="closedEnd"
              placeholder="Please select..."
              bg="white"
              borderColor={getFormInputBorderColor({
                hasError: errors['closedEnd'],
              })}
              w="100%"
              onChange={onChange}
              value={value}
            >
              {closedEndSelectValues[selectedBagStyle].map(
                ({ value, display }: SelectValue<string>, i: number) => (
                  <option
                    key={`${value}-${i}`}
                    value={value}
                    // selected={getValues()?.closedEnd == value}
                  >
                    {display}
                  </option>
                )
              )}
            </Select>
          )}
        />
        {errors.closedEnd && (
          <FormHelperText color="red.500">
            {errors.closedEnd.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl>
        <FormLabel
          color={getFormLabelColor({ hasError: errors['annualUsage'] })}
        >
          Annual Usage
        </FormLabel>
        <NumberInput min={0}>
          <NumberInputField
            name="annualUsage"
            bg="white"
            borderColor={getFormInputBorderColor({
              hasError: errors['annualUsage'],
            })}
            w="100%"
            {...register('annualUsage', {
              required: 'Please enter your annual usage.',
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {errors.annualUsage && (
          <FormHelperText color="red.500">
            {errors.annualUsage.message}
          </FormHelperText>
        )}
      </FormControl>
    </SimpleGrid>
  );
};

export default GeneralInformation;
