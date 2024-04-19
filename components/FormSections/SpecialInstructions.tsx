import * as React from 'react';
import {
  FormControl,
  FormLabel,
  GridItem,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';

import {
  getFormLabelColor,
  getFormInputBorderColor,
} from '../../utils/style.utils';

type SpecialInstructionsProps = {
  register: any;
};

const SpecialInstructions = ({ register }: SpecialInstructionsProps) => {
  return (
    <SimpleGrid spacing={4} columns={1}>
      <GridItem colSpan={{ base: 1, lg: 1 }}>
        <FormControl id="specialInstructions">
          <FormLabel color={getFormLabelColor({ hasError: false })}>
            Notes
          </FormLabel>
          <Textarea
            name="specialInstructions"
            bg="white"
            borderColor={getFormInputBorderColor({
              hasError: false,
            })}
            w="100%"
            rows={10}
            {...register('specialInstructions')}
          />
        </FormControl>
      </GridItem>
    </SimpleGrid>
  );
};

export default SpecialInstructions;
