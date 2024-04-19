import {
  SimpleGrid,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import * as React from 'react';
import {
  getFormInputBorderColor,
  getFormLabelColor,
} from '../../utils/style.utils';

type CustomerDetailsProps = {
  errors: Record<string, any>;
  register: any;
};

const CustomerDetails = ({ errors, register }: CustomerDetailsProps) => {
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, lg: 3 }}>
      <FormControl id="customerName">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['customerName'] })}
        >
          Customer Name
        </FormLabel>
        <Input
          name="customerName"
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['customerName'],
          })}
          {...register('customerName')}
        />
        {errors.customerName && (
          <FormHelperText color="red.500">
            {errors.customerName.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="contactName">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['contactName'] })}
        >
          Contact Name
        </FormLabel>
        <Input
          name="contactName"
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['contactName'],
          })}
          {...register('contactName')}
        />
        {errors.contactName && (
          <FormHelperText color="red.500">
            {errors.contactName.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="orderDescription">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['orderDescription'] })}
        >
          Order Description
        </FormLabel>
        <Input
          name="orderDescription"
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['orderDescription'],
          })}
          {...register('orderDescription')}
        />
        {errors.orderDescription && (
          <FormHelperText color="red.500">
            {errors.orderDescription.message}
          </FormHelperText>
        )}
      </FormControl>
    </SimpleGrid>
  );
};

export default CustomerDetails;
