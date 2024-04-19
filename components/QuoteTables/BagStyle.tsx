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

type BagStyleProps = {
  customerEnd: string;
  mfgEnd: string;
  type: string;
};

const BagStyle = ({ customerEnd, mfgEnd, type }: BagStyleProps) => {
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
            Bag Style
          </Text>
        </TableCaption>
        <Tbody>
          <Tr>
            <Td w="25%">
              <Text>Type</Text>
            </Td>
            <Td>
              <Text>{type}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Mfg End</Text>
            </Td>
            <Td>
              <Text>{mfgEnd}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Customer End</Text>
            </Td>
            <Td>
              <Text>{customerEnd}</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default BagStyle;
