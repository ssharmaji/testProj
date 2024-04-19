import { IQuoteDisplay } from '../domain/IQuoteDisplay';

const borderStyle = 'border: 1px solid #000;';
const tableWrapperStyle = 'padding: 8px 0px; width: 400px; margin: 0 auto;';
const tableStyle = 'width: 100%';
const thStyle = 'padding: 4px; text-align: center;';
const tdStyle = 'border: 1px solid #000; padding: 4px;';

const numberFormatter = new Intl.NumberFormat();

export const getQuoteHtml = ({
  bagsPerPallet,
  bestPrice,
  palletTableData,
  quoteDisplay,
}: {
  bagsPerPallet: number;
  bestPrice: string;
  palletTableData: Array<{
    numPallets: number;
    qty: string;
    pxPerThousand: string;
  }>;
  quoteDisplay: IQuoteDisplay;
}): string => {
  const { bagStyle, bagDimensions, bagSpecs, orderDetails } = quoteDisplay;
  const roundedMoq = numberFormatter.format(
    Math.ceil(orderDetails.moq / 100) * 100
  );

  return `
<div style="padding: 16px 0px">
  <h1 style="text-align: center"><strong>New Quote</strong></h1>
</div>
<div style="${tableWrapperStyle}">
  <table style="${tableStyle}">
    <thead style="${borderStyle}"">
      <tr>
        <th colspan="2" style="${thStyle}">Customer Details</th>
      </tr>
    </thead> 
    <tbody style="${borderStyle}">
      <tr>
        <td style="${tdStyle}"><strong>Customer</strong></td>
        <td style="${tdStyle}">${quoteDisplay.customerDetails.customerName}</td>
      </tr>
      <tr>
        <td style="${tdStyle}"><strong>Contact</strong></td>
        <td style="${tdStyle}">${quoteDisplay.customerDetails.contactName}</td>
      </tr>
      <tr>
        <td style="${tdStyle}"><strong>Description</strong></td>
        <td style="${tdStyle}">${
    quoteDisplay.customerDetails.orderDescription
  }</td>
      </tr>
    </tbody>
  </table>
</div>
<div style="${tableWrapperStyle}">
  <table style="${tableStyle}">
    <thead style="${borderStyle}">
      <tr>
        <th colspan="2" style="${thStyle}">Bag Style</th>
      </tr>
    </thead>
    <tbody style="${borderStyle}">
      <tr>
        <td style="${tdStyle}"><strong>Type</strong></td>
        <td style="${tdStyle}">${bagStyle.type}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Mfg End</strong></td>
        <td style="${tdStyle}">${bagStyle.mfgEnd}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Customer End</strong></td>
        <td style="${tdStyle}">${bagStyle.customerEnd}</td>
      </tr> 
    </tbody>
  </table>
</div>
<div style="${tableWrapperStyle}">
  <table style="${tableStyle}">
    <thead style="${borderStyle}">
      <tr>
        <th colspan="2" style="${thStyle}">Bag Dimensions</th>
      </tr>
    </thead>
    <tbody style="${borderStyle}">
      <tr>
        <td style="${tdStyle}"><strong>Width</strong></td>
        <td style="${tdStyle}">${bagDimensions.width}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Gusset</strong></td>
        <td style="${tdStyle}">${bagDimensions.gusset}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Finished Length</strong></td>
        <td style="${tdStyle}">${bagDimensions.finishedLength}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Sleeve Length</strong></td>
        <td style="${tdStyle}">${
    bagDimensions.sleeveLength && bagDimensions.sleeveLength.toFixed(2)
  }</td>
      </tr> 
    </tbody>
  </table>
</div>
<div style="${tableWrapperStyle}">
  <table style="${tableStyle}">
    <thead style="${borderStyle}">
      <tr>
        <th colspan="2" style="${thStyle}">Bag Specs</th>
      </tr>
    </thead>
    <tbody style="${borderStyle}">
      <tr>
        <td style="${tdStyle}"><strong>Outer Layer Type</strong></td>
        <td style="${tdStyle}">${bagSpecs.outerLayerType}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Fabric GSM</strong></td>
        <td style="${tdStyle}">${bagSpecs.fabricGSM}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Fabric Color</strong></td>
        <td style="${tdStyle}">${bagSpecs.fabricColor}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong># Colors</strong></td>
        <td style="${tdStyle}">${bagSpecs.numberOfColors}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Prepress Cost</strong></td>
        <td style="${tdStyle}">${bagSpecs.prepressCost}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Handle</strong></td>
        <td style="${tdStyle}">${
    !bagSpecs.handle ? 'N/A' : bagSpecs.handle
  }</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Bag Total SQM</strong></td>
        <td style="${tdStyle}">${bagSpecs.bagTotalSQM}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Bag GSM</strong></td>
        <td style="${tdStyle}">${bagSpecs.bagGSM}</td>
      </tr> 
    </tbody>
  </table>
</div>
<div style="${tableWrapperStyle}">
  <table style="${tableStyle}">
    <thead style="${borderStyle}">
      <tr>
        <th colspan="2" style="${thStyle}">Order Details</th>
      </tr>
    </thead>
    <tbody style="${borderStyle}">
      <tr>
        <td style="${tdStyle}"><strong>FOB</strong></td>
        <td style="${tdStyle}">${orderDetails.fob}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Bags per Pallet</strong></td>
        <td style="${tdStyle}">${bagsPerPallet}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>MOQ</strong></td>
        <td style="${tdStyle}">${roundedMoq}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Order Size</strong></td>
        <td style="${tdStyle}">${orderDetails.orderSize}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Annual Usage</strong></td>
        <td style="${tdStyle}">${orderDetails.annualUsage}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}"><strong>Best Price</strong></td>
        <td style="${tdStyle}">${bestPrice}</td>
      </tr> 
    </tbody>
  </table>
</div>
<div style="${tableWrapperStyle}">
  <table style="${tableStyle}">
    <thead style="${borderStyle}">
      <tr>
        <th style="${thStyle}"># Pallets</th>
        <th style="${thStyle}">Bag Qty</th>
        <th style="${thStyle}">Price / 1000</th>
      </tr>
    </thead>
    <tbody style="${borderStyle}">
      <tr>
        <td style="${tdStyle}">${palletTableData[0].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[0].qty}</td>
        <td style="${tdStyle}">${palletTableData[0].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[1].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[1].qty}</td>
        <td style="${tdStyle}">${palletTableData[1].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[2].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[2].qty}</td>
        <td style="${tdStyle}">${palletTableData[2].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[3].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[3].qty}</td>
        <td style="${tdStyle}">${palletTableData[3].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[4].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[4].qty}</td>
        <td style="${tdStyle}">${palletTableData[4].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[5].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[5].qty}</td>
        <td style="${tdStyle}">${palletTableData[5].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[6].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[6].qty}</td>
        <td style="${tdStyle}">${palletTableData[6].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[7].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[7].qty}</td>
        <td style="${tdStyle}">${palletTableData[7].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[8].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[8].qty}</td>
        <td style="${tdStyle}">${palletTableData[8].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[9].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[9].qty}</td>
        <td style="${tdStyle}">${palletTableData[9].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[10].numPallets}</td>
        <td style="${tdStyle}">${palletTableData[10].qty}</td>
        <td style="${tdStyle}">${palletTableData[10].pxPerThousand}</td>
      </tr> 
      <tr>
        <td style="${tdStyle}">${palletTableData[11].numPallets} or More</td>
        <td style="${tdStyle}">${palletTableData[11].qty}</td>
        <td style="${tdStyle}">${palletTableData[11].pxPerThousand}</td>
      </tr> 
    </tbody>
  </table>
</div>
`;
};
