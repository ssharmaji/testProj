import * as React from 'react';
import {
  Box,
  Text,
  Table,
  TableCaption,
  Tr,
  Tbody,
  Td,
} from '@chakra-ui/react';

import { YesOrNo } from '../../domain/YesOrNo';

type BagSpecsProps = {
  outerLayerType: string;
  fabricGSM: number;
  fabricColor: string;
  numberOfColors: string;
  prepressCost: string;
  handle: YesOrNo;
  bagGSM: string;
  bagTotalSQM: string;
};

const BagSpecs = ({
  outerLayerType,
  fabricGSM,
  fabricColor,
  numberOfColors,
  prepressCost,
  handle,
  bagGSM,
  bagTotalSQM,
}: BagSpecsProps) => {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="8"
      mx="auto"
      p={8}
      w="80%"
    >
      <Table variant="striped" colorScheme="gray" id="bagStyle">
        <TableCaption placement="top" bg="blue.600">
          <Text
            color="white"
            fontSize="lg"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Bag Specs
          </Text>
        </TableCaption>
        <Tbody>
          <Tr>
            <Td w="25%">
              <Text>Outer Layer Type</Text>
            </Td>
            <Td>
              <Text>{outerLayerType}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Fabric GSM</Text>
            </Td>
            <Td>
              <Text>{fabricGSM}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Fabric Color</Text>
            </Td>
            <Td>
              <Text>{fabricColor}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text># Colors</Text>
            </Td>
            <Td>
              <Text>{numberOfColors}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Prepress Cost</Text>
            </Td>
            <Td>
              <Text>{prepressCost}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Handle</Text>
            </Td>
            <Td>
              <Text>{!handle ? 'N/A' : handle}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Bag Total SQM</Text>
            </Td>
            <Td>
              <Text>{bagTotalSQM}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Bag GSM</Text>
            </Td>
            <Td>
              <Text>{bagGSM}</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default BagSpecs;
