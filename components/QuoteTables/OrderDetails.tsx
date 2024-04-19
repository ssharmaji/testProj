import * as React from 'react';
import {
  Box,
  Text,
  Table,
  TableCaption,
  Tr,
  Tbody,
  Td,
  Tooltip,
} from '@chakra-ui/react';

type OrderDetailsProps = {
  bagsPerPallet: number;
  fob: string;
  moq: number;
  orderSize: string;
  annualUsage: string;
  bestPrice: string;
};

const numberFormatter = new Intl.NumberFormat();

const OrderDetails = ({
  fob,
  bagsPerPallet,
  moq,
  orderSize,
  annualUsage,
  bestPrice,
}: OrderDetailsProps) => {
  // We want to round the displayed MOQ on the quote to the nearest 100
  const roundedMoq = numberFormatter.format(Math.ceil(moq / 100) * 100);

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
        <TableCaption placement="top" bg="red.400">
          <Text
            color="white"
            fontSize="lg"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Order Details
          </Text>
        </TableCaption>
        <Tbody>
          <Tr>
            <Td w="25%">
              <Text>FOB</Text>
            </Td>
            <Td>
              <Text>{fob}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Bags per Pallet</Text>
            </Td>
            <Td>
              <Text>{bagsPerPallet}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text display="flex" alignItems="center">
                <span>MOQ</span>
                <Tooltip
                  label="Minimum Order Quantity for Best Price"
                  fontSize="sm"
                >
                  <Box ml="1" h="4" w="4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Box>
                </Tooltip>
              </Text>
            </Td>
            <Td>
              <Text>{roundedMoq}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Order Size</Text>
            </Td>
            <Td>
              <Text>{orderSize}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Annual Usage</Text>
            </Td>
            <Td>
              <Text>{annualUsage}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td w="25%">
              <Text>Best Price</Text>
            </Td>
            <Td>
              <Text>{bestPrice} / 1,000 bags</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderDetails;
