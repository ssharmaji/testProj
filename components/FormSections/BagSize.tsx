// @ts-nocheck
import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  Flex,
} from '@chakra-ui/react';

import {
  getFormLabelColor,
  getFormInputBorderColor,
} from '../../utils/style.utils';
import {
  gussetSelectValues,
  sewnSleeveLengthSelectValues,
  sleeveLengthSelectValues,
  widthSelectValues,
} from '../../utils/form.utils';
import { Controller } from 'react-hook-form';
import { SelectValue } from '../../domain/SelectValue';

type BagSizeProps = {
  errors: Record<string, any>;
  finishedLength: string;
  gluePlateDepth: string;
  isSewnBag: boolean;
  register: any;
  selectedBagStyle: string;
  keyIndex: any;
  handleUpdateChange: any;
  sleeveLength: any;
  getValues: any;
  control: any;
};

const BagSize = ({
  errors,
  finishedLength,
  gluePlateDepth,
  isSewnBag,
  register,
  selectedBagStyle,
  keyIndex,
  handleUpdateChange,
  sleeveLength = [],
  getValues,
  control,
}: BagSizeProps) => {
  // if (sleeveLength.length) {
  //   handleUpdateChange();
  // }
  const [sleeveLengthValues, setSleeveLengthValues] = React.useState<
    SelectValue<number>[]
  >([]);

  React.useEffect(() => {
    console.log(`IsSewnBag: ${isSewnBag}`);
    isSewnBag
      ? setSleeveLengthValues([
          ...sewnSleeveLengthSelectValues,
          ...sleeveLengthSelectValues,
        ])
      : setSleeveLengthValues([...sleeveLengthSelectValues]);
  }, [isSewnBag]);

  // console.log('Props in BagSize:', {
  //   key,
  //   errors,
  //   finishedLength,
  //   gluePlateDepth,
  //   isSewnBag,
  //   register,
  //   selectedBagStyle,
  // });

  return (
    <SimpleGrid
      key={`${keyIndex}`}
      data-custom-key={`${keyIndex}`}
      className="form-control-bag"
      spacing={4}
      columns={{ base: 1, lg: 1 }}
    >
      <FormControl id="bagName">
        <FormLabel
          color={getFormLabelColor({
            hasError: errors['bagName']?.[keyIndex]
              ? errors['bagName'][keyIndex]
              : false,
          })}
        >
          Bag Name
        </FormLabel>
        <Input
          //data-input-key={`bag-${keyIndex}`}
          name={`bagName`}
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['bagName']?.[keyIndex]
              ? errors['bagName'][keyIndex]
              : false,
          })}
          {...register('bagName[' + keyIndex + ']', {
            required: 'Bag Name is required',
          })}
        />
        {errors.bagName && (
          <FormHelperText color="red.500">
            {errors.bagName.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl id="width">
        <FormLabel
          color={getFormLabelColor({
            hasError: errors['width']?.[keyIndex]
              ? errors['width'][keyIndex]
              : false,
          })}
        >
          Width
        </FormLabel>
        {/* <Controller
          control={control}
          name={'width[' + keyIndex + ']'}
          rules={{ required: 'Please select a width.' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              defaultValue=""
              // name="width"
              onChange={onChange}
              value={value}
              placeholder={
                selectedBagStyle === 'Default'
                  ? 'Please select a bag style...'
                  : 'Please select...'
              }
              bg="white"
              borderColor={getFormInputBorderColor({
                hasError: errors['width']?.[keyIndex]
                  ? errors['width'][keyIndex]
                  : false,
              })}
              w="100%"
              {...register('width[' + keyIndex + ']', {
                required: 'Please select a width.',
              })}
              disabled={selectedBagStyle === 'Default'}
            >
              {widthSelectValues[selectedBagStyle].map(
                (width: number, i: number) => (
                  <option key={`${width}-${keyIndex}-${i}`} value={width}>
                    {width}
                  </option>
                )
              )}
            </Select>
          )}
        /> */}
        <Select
          // defaultValue={getValues()?.width[keyIndex]}
          name="width"
          placeholder={
            selectedBagStyle === 'Default'
              ? 'Please select a bag style...'
              : 'Please select...'
          }
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['width']?.[keyIndex]
              ? errors['width'][keyIndex]
              : false,
          })}
          w="100%"
          {...register('width[' + keyIndex + ']', {
            required: 'Please select a width.',
          })}
          disabled={selectedBagStyle === 'Default'}
        >
          {widthSelectValues[selectedBagStyle].map(
            (width: number, i: number) => (
              <option
                key={`${width}-${keyIndex}-${i}`}
                value={width}
                selected={getValues()?.width[keyIndex] == width}
              >
                {width}
              </option>
            )
          )}
        </Select>
        {errors.width && (
          <FormHelperText color="red.500">
            {errors.width.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="gusset">
        <FormLabel
          color={getFormLabelColor({
            hasError: errors['gusset']?.[keyIndex]
              ? errors['gusset'][keyIndex]
              : false,
          })}
        >
          Gusset
        </FormLabel>
        <Select
          name={`gusset`}
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['gusset']?.[keyIndex]
              ? errors['gusset'][keyIndex]
              : false,
          })}
          w="100%"
          {...register('gusset[' + keyIndex + ']', {
            required: 'Please select a gusset.',
          })}
        >
          {gussetSelectValues.map((gusset, i) => (
            <option key={`${gusset}-${keyIndex}-${i}`} value={gusset}>
              {gusset}
            </option>
          ))}
        </Select>
        {errors.gusset && (
          <FormHelperText color="red.500">
            {errors.gusset.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="sleeveLength">
        <FormLabel
          color={getFormLabelColor({
            hasError: errors['sleeveLength']?.[keyIndex]
              ? errors['sleeveLength'][keyIndex]
              : false,
          })}
        >
          Sleeve Length
        </FormLabel>
        <Select
          id="sleeveLengths"
          data-attr="sleeveLengths"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['sleeveLength']?.[keyIndex]
              ? errors['sleeveLength'][keyIndex]
              : false,
          })}
          w="100%"
          // defaultValue={sleeveLength.length ? sleeveLength[keyIndex] : ''}
          onChange={handleUpdateChange}
          //required= "Please select a sleeve length."
        >
          {sleeveLengthValues.map(
            ({ display, value }: SelectValue<number>, i: number) => (
              <option
                key={`${display}-${keyIndex}-${i}`}
                value={value}
                selected={
                  sleeveLength.length
                    ? display.toFixed(1) ==
                      Number(sleeveLength[keyIndex]).toFixed(1)
                    : ''
                }
              >
                {display}
              </option>
            )
          )}
        </Select>

        {/*This is the helper for sleeveLength SELECT Box*/}
        {/*<Select
          placeholder="Please select..."
          data-attr="sleeveLengthsHelper"
          value={sleeveLength[keyIndex]?sleeveLength[keyIndex]:''}
          {...register('sleeveLength['+keyIndex+']', {
            required: 'Please select a sleeve length.',
          })}
        >
          {sleeveLengthValues.map(
            ({ display, value }: SelectValue<number>, i: number) => (
              <option key={`${display}-${keyIndex}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>*/}

        <Input
          data-attr="sleeveLengthsHelper"
          // name={`sleeveLength`}
          bg="white"
          //value={sleeveLength[keyIndex]?sleeveLength[keyIndex]:''}
          borderColor={getFormInputBorderColor({
            hasError: errors['sleeveLength']?.[keyIndex]
              ? errors['sleeveLength'][keyIndex]
              : false,
          })}
          {...register('sleeveLength[' + keyIndex + ']', {
            required: 'Please select a sleeve length.',
          })}
        />

        {/*sleeveLength Helper End Here*/}
        {errors['sleeveLength']?.[keyIndex] && (
          <FormHelperText color="red.500">
            {errors['sleeveLength']?.[keyIndex]
              ? errors.sleeveLength[keyIndex].message
              : false}
          </FormHelperText>
        )}

        {/*{errors['sleeveLength']?.[keyIndex] && (
          <FormHelperText color="red.500">
            {errors['sleeveLength']?.[keyIndex]?errors.sleeveLength[keyIndex].message:false}
          </FormHelperText>
        )}*/}
      </FormControl>

      {selectedBagStyle === 'Step Cut' ? (
        <FormControl id="gluePlateDepth">
          <FormLabel
            color={getFormLabelColor({
              hasError: errors['gluePlateDepth']?.[keyIndex]
                ? errors['gluePlateDepth'][keyIndex]
                : false,
            })}
          >
            Fold Depth
          </FormLabel>
          <Input
            name="gluePlateDepth"
            bg="white"
            borderColor="gray.501"
            w="100%"
            disabled
            readOnly
            value={gluePlateDepth}
            {...register('gluePlateDepth[' + keyIndex + ']')}
          />
        </FormControl>
      ) : null}

      <FormControl id="finishedLength">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['finishedLength'] })}
        >
          Finished Length
        </FormLabel>
        <Input
          name="finishedLength"
          bg="white"
          borderColor="gray.500"
          w="100%"
          disabled
          readOnly
          value={finishedLength[keyIndex] ? finishedLength[keyIndex] : ''}
          {...register('finishedLength[' + keyIndex + ']')}
        />
      </FormControl>
      {/* 
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
            {...register('BagSizesQuote['+keyIndex+']')}
          />
        </FormControl>
        */}
    </SimpleGrid>
  );
};

export default BagSize;
