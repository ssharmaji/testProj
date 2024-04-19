import * as React from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
} from '@chakra-ui/react';

type BagDimensionsProps = {
  finishedLength: number;
  gusset: number;
  sleeveLength: any;
  width: number;
};

const BagDimensions = ({
  finishedLength,
  gusset,
  sleeveLength,
  width,
}: BagDimensionsProps) => {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="8"
      mx="auto"
      p={8}
      w="80%"
    >
      <Table variant="striped" colorScheme="gray" id="bagDimensions">
        <TableCaption placement="top" bg="red.400">
          <Text
            color="white"
            fontSize="lg"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Bag Dimensions
          </Text>
        </TableCaption>
        <Tbody>
          <Tr>
            <Td w="25%">Width</Td>
            <Td>{width}</Td>
          </Tr>
          <Tr>
            <Td>Gusset</Td>
            <Td>{gusset}</Td>
          </Tr>
          <Tr>
            <Td>Finished Length</Td>
            <Td>{finishedLength}</Td>
          </Tr>
          <Tr>
            <Td>Sleeve Length</Td>
            <Td>{sleeveLength && sleeveLength.toFixed(2)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default BagDimensions;
