export const getFormLabelColor = ({ hasError }: { hasError: boolean }) => {
  return hasError ? 'red.500' : 'gray.800';
};

export const getFormInputBorderColor = ({
  hasError,
}: {
  hasError: boolean;
}) => {
  return hasError ? 'red.500' : 'gray.500';
};
