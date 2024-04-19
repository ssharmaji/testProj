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
  gsmSelectValues,
  layerMaterialSelectValues,
  matteUpchargeSelectValues,
  numberOfColorsSelectValues,
  outerLayerTypeSelectValues,
  printedGSMSelectValues,
  stickerOrHotMeltSelectValues,
} from '../../utils/form.utils';
import { SelectValue } from '../../domain/SelectValue';

type OuterLayerProps = {
  errors: Record<string, any>;
  outerLayerType: string;
  register: any;
  selectedBagStyle: string;
};

const OuterLayer = ({
  errors,
  outerLayerType,
  register,
  selectedBagStyle,
}: OuterLayerProps) => {
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, lg: 1 }}>
      <FormControl id="outerLayerType">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['outerLayerType'] })}
        >
          Outer Layer Type
        </FormLabel>
        <Select
          name="outerLayerType"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['outerLayerType'],
          })}
          w="100%"
          {...register('outerLayerType', {
            required: 'Please select an outer layer type.',
          })}
        >
          {outerLayerTypeSelectValues.map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.outerLayerType && (
          <FormHelperText color="red.500">
            {errors.outerLayerType.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="gsm">
        <FormLabel color={getFormLabelColor({ hasError: errors['gsm'] })}>
          {outerLayerType === 'paper' ? 'GSM' : 'Printed GSM'}
        </FormLabel>
        <Select
          name="gsm"
          placeholder="Please select..."
          disabled
          value={'19'}
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['gsm'],
          })}
          w="100%"
        >
          {/*outerLayerType === 'paper'
            ? gsmSelectValues.map((gsm: number, i: number) => (
                <option key={`${gsm}-${i}`} value={gsm}>
                  {gsm}
                </option>
              ))
            : printedGSMSelectValues.map((printedGSM: number, i: number) => (
                <option key={`${printedGSM}-${i}`} value={printedGSM}>
                  {printedGSM}
                </option>
            ))*/}
        </Select>
        {errors.gsm && (
          <FormHelperText color="red.500">{errors.gsm.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl id="layerMaterial">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['layerMaterial'] })}
        >
          BOPP Supplier
        </FormLabel>
        <Select
          name="layerMaterial"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['layerMaterial'],
          })}
          w="100%"
          {...register('layerMaterial', {
            required: 'Please select a layer material.',
          })}
        >
          {layerMaterialSelectValues.map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.layerMaterial && (
          <FormHelperText color="red.500">
            {errors.layerMaterial.message}
          </FormHelperText>
        )}
      </FormControl>

      {outerLayerType.includes('Matte') && (
        <FormControl id="matteUpcharge">
          <FormLabel
            color={getFormLabelColor({ hasError: errors['matteUpcharge'] })}
          >
            Matte Upcharge
          </FormLabel>
          <Select
            name="matteUpcharge"
            placeholder="Please select..."
            bg="white"
            borderColor={getFormInputBorderColor({
              hasError: errors['matteUpcharge'],
            })}
            w="100%"
            {...register('matteUpcharge', {
              required: 'Please select a matte upcharge.',
            })}
          >
            {matteUpchargeSelectValues.map(
              (matteUpcharge: number, i: number) => (
                <option key={`${matteUpcharge}-${i}`} value={matteUpcharge}>
                  {matteUpcharge}
                </option>
              )
            )}
          </Select>
          {errors.matteUpcharge && (
            <FormHelperText color="red.500">
              {errors.matteUpcharge.message}
            </FormHelperText>
          )}
        </FormControl>
      )}

      <FormControl id="stickerOrHotMelt">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['stickerOrHotMelt'] })}
        >
          Sticker or Hot Melt
        </FormLabel>
        <Select
          name="stickerOrHotMelt"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['stickerOrHotMelt'],
          })}
          w="100%"
          {...register('stickerOrHotMelt', {
            required: 'Please select Sticker or Hot Melt.',
          })}
        >
          {stickerOrHotMeltSelectValues.map(
            ({ value, display }: SelectValue<string>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.stickerOrHotMelt && (
          <FormHelperText color="red.500">
            {errors.stickerOrHotMelt.message}
          </FormHelperText>
        )}
      </FormControl>

      {selectedBagStyle === 'Standard' && (
        <FormControl id="handle">
          <FormLabel color={getFormLabelColor({ hasError: errors['handle'] })}>
            Handle
          </FormLabel>
          <Select
            name="handle"
            placeholder="Please select..."
            bg="white"
            borderColor={getFormInputBorderColor({
              hasError: errors['handle'],
            })}
            w="100%"
            {...register(
              'handle',
              selectedBagStyle === 'Standard'
                ? { required: 'Please select a handle.' }
                : {}
            )}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          {errors.handle && (
            <FormHelperText color="red.500">
              {errors.handle.message}
            </FormHelperText>
          )}
        </FormControl>
      )}

      <FormControl id="highCOF">
        <FormLabel color={getFormLabelColor({ hasError: errors['highCOF'] })}>
          High COF
        </FormLabel>
        <Select
          name="highCOF"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['highCOF'],
          })}
          w="100%"
          {...register('highCOF', {
            required: 'Please select a High COF.',
          })}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
        {errors.highCOF && (
          <FormHelperText color="red.500">
            {errors.highCOF.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl id="numberOfColors">
        <FormLabel
          color={getFormLabelColor({ hasError: errors['numberOfColors'] })}
        >
          # Of Colors
        </FormLabel>
        <Select
          name="numberOfColors"
          placeholder="Please select..."
          bg="white"
          borderColor={getFormInputBorderColor({
            hasError: errors['numberOfColors'],
          })}
          w="100%"
          {...register('numberOfColors', {
            required: 'Please select a number of colors.',
          })}
        >
          {numberOfColorsSelectValues.map(
            ({ value, display }: SelectValue<string | number>, i: number) => (
              <option key={`${value}-${i}`} value={value}>
                {display}
              </option>
            )
          )}
        </Select>
        {errors.numberOfColors && (
          <FormHelperText color="red.500">
            {errors.numberOfColors.message}
          </FormHelperText>
        )}
      </FormControl>
    </SimpleGrid>
  );
};

export default OuterLayer;
