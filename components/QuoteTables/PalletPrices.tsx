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
    pxPerThousandWithoutCurrency: any;
  }>,
  highestCost:any
};


const PalletPrices = ({ palletCosts, highestCost  }: PalletPricesProps) => {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="8"
      mx="auto"
      w="100%"
      className="moq_table_box"
    >
      <Table className="moq_table" colorScheme="gray" id="palletPrices">
        <Thead>
          <Tr bg="blue.600" className="moq_table_header">
            <Th className="moq_table_row_number">
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Pallets #
              </Text>
            </Th>
            <Th className="moq_table_row_value">
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
              >
                
              </Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody data-highest-price={highestCost}>
          {palletCosts.map((palletCost, i) => (
            <React.Fragment key={`${palletCost.numPallets} - ${i}`}>
              {i === palletCosts.length - 1 ? (
                <Tr bg="red.400" className="moq_table_row">
                  <Td className="moq_table_row_number">
                    <Text>{i}+ </Text>
                  </Td>
                  <Td className="moq_table_row_value">
                     <Box
                      className="value_wrapper"
                      style={{
                        '--width': (100 * palletCost.pxPerThousandWithoutCurrency) / highestCost+'%',
                      } as any }
                    >
                      <Text>{palletCost.qty} {'bags'}</Text>
                      <Text className="text_seprator">|</Text>
                      <Text>{palletCost.pxPerThousand}</Text>
                    </Box>
                  </Td>
                </Tr>
              ) : (
                <Tr className="moq_table_row">
                  <Td className="moq_table_row_number">
                    <Text>{palletCost.numPallets}</Text>
                  </Td>
                  <Td className="moq_table_row_value">
                    <Box
                      className="value_wrapper"
                      style={{
                        '--width': (100 * palletCost.pxPerThousandWithoutCurrency) / highestCost+'%',
                      } as any}
                    >
                      <Text>{palletCost.qty} {'bags'}</Text>
                      <Text className="text_seprator">|</Text>
                      <Text>{palletCost.pxPerThousand}</Text>
                    </Box>
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
