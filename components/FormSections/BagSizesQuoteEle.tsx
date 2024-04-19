import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  Flex
} from '@chakra-ui/react';

import {
  getFormLabelColor,
  getFormInputBorderColor,
} from '../../utils/style.utils';

//import { SelectValue } from '../../domain/SelectValue';

type BagSizeQuoteProps = {
  errors: Record<string, any>;
  register: any;
};

const BagSizesQuoteEle = ({
  errors,
  register
}: BagSizeQuoteProps) => {
  return (
      <SimpleGrid className="form-control-bag-sizes-quote" spacing={4} columns={{ base: 1, lg: 1 }}>
        <FormControl id="BagSizesQuote">
          <FormLabel color={getFormLabelColor({ hasError: false })}>
          Bag Sizes to Quote
          </FormLabel>
          <Textarea
            name="BagSizesQuote"
            bg="white"
            borderColor={getFormInputBorderColor({
              hasError: false,
            })}
            w="100%"
            rows={17}
            {...register('BagSizesQuote')}
          />
        </FormControl>
    </SimpleGrid>
  );
};

export default BagSizesQuoteEle;
