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
  Thead,
  Th,
} from '@chakra-ui/react';

type PalletPricesProps = {
  palletCosts: Array<{
    numPallets: number;
    qty: string;
    pxPerThousand: string;
  }>;
};

const PalletPrices = ({ palletCosts }: PalletPricesProps) => {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="8"
      mx="auto"
      p={8}
      w="80%"
    >
      <Table variant="striped" colorScheme="gray" id="palletPrices">
        <Thead>
          <Tr bg="blue.600">
            <Th>
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
              >
                # Pallets
              </Text>
            </Th>
            <Th>
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Bag Qty
              </Text>
            </Th>
            <Th>
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Price / 1000
              </Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {palletCosts.map((palletCost, i) => (
            <React.Fragment key={`${palletCost.numPallets} - ${i}`}>
              {i === palletCosts.length - 1 ? (
                <Tr bg="red.400">
                  <Td>
                    <Text color="white">{i + 1} or More</Text>
                  </Td>
                  <Td>
                    <Text color="white">{palletCost.qty}</Text>
                  </Td>
                  <Td>
                    <Text color="white">{palletCost.pxPerThousand}</Text>
                  </Td>
                </Tr>
              ) : (
                <Tr>
                  <Td>
                    <Text>{palletCost.numPallets}</Text>
                  </Td>
                  <Td>
                    <Text>{palletCost.qty}</Text>
                  </Td>
                  <Td>
                    <Text>{palletCost.pxPerThousand}</Text>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PalletPrices;
